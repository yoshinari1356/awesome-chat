import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit {
  data: { roomname: string } = { roomname: '' };

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  addRoom() {
    console.log("addRoom");
    const newData = firebase.database().ref('chatrooms/')
    .push({
      roomname: this.data.roomname
    });
    this.navCtrl.navigateRoot('room');
  }
}
