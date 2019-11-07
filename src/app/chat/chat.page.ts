import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonContent } from '@ionic/angular';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  roomkey: string;
  nickname: string;
  chatMessage: string;

  chats = [];
  offStatus = false;

  @ViewChild(IonContent, {read: IonContent , static: true}) content: IonContent;

  constructor(public navCtrl: NavController, public route: ActivatedRoute) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.roomkey = this.route.snapshot.paramMap.get('key') as string;
        this.nickname = user.email;

        this.sendJoinMessage();
        this.displayChatMessage();

      } else {
        this.navCtrl.navigateRoot('signin');
      }
    });
  }
  ngOnInit() {
  }

  displayChatMessage() {
    firebase.database()
      .ref('chatrooms/' + this.roomkey + '/chats')
      .on('value', resp => {

        if (resp) {
          this.chats = [];
          resp.forEach(childSnapshot => {
            const chat = childSnapshot.val();
            chat.key = childSnapshot.key;
            this.chats.push(chat);
          });
          setTimeout(async () => {
            if (this.offStatus === false) {
              // FIX-ME
              // V4でコンテンツエリアをスクロールする方法が分からない
              // const el = await this.content.getScrollElement();
              // el.scrollToBottom(300);
              await this.content.scrollToBottom(300);
            }
          });
        }
      });
  }

  exitChat() {
    this.sendExitMessage();
    this.offStatus = true;
    this.navCtrl.navigateBack('room');
  }

  sendChatMessage() {
    this.sendMessage('message', this.chatMessage);
  }

  sendJoinMessage() {
    this.sendMessage('join', this.nickname + ' has joined this room.');
  }

  sendExitMessage() {
    this.sendMessage('exit', this.nickname + ' has exited this room.');
  }

  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: type,
      user: this.nickname,
      message: message,
      sendDate: Date()
    });
  }
}


