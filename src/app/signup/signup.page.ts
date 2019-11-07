import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  data: { email: string, password: string } = { email: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
  }
  async signUp() {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.email, this.data.password);

      this.navCtrl.navigateRoot('room');

    } catch (error) {
      const alert = await this.alertController.create({
        header: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }
}



