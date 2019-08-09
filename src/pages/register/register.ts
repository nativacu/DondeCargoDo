import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  signupEmail:string;
  signupPassword:string;
  fname:string;
  lname:string;
  id:string;
  phone: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){
    this.fauth.doRegister({"email": this.signupEmail, "password":this.signupPassword}).then(
      (user:firebase.User)=>{
        console.log('Registered user');
        this.http.sendPostRequest({cedula: this.id, primernombre: this.fname, segundonombre: 0, primerapellido: this.lname, segundoapellido: 0, t_usuario: 2,
          foto: 0, email: this.signupEmail, telefono: this.phone}, 'post.php').then((data) =>{
            this.fauth.currUser.next(data);
            this.navCtrl.setRoot(MapPage);
          },
          (kabum) =>{
            user.delete();
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
  }


}
