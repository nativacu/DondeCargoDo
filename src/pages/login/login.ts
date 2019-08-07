import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MapPage } from '../map/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginEmail:string;
  loginPassword:string;
  signupEmail:string;
  signupPassword:string;
  fname:string;
  lname:string;
  id:string;
  phone: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public navCtrl: NavController, public navParams: NavParams, public fauth:AuthProvider, public http: HttpRequestProvider) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    //   (window as any).handleOpenURL = (url: string) => {
    //     Auth0Cordova.onRedirectUri(url);
    //   }
    // });
 
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.fauth.doLogin({"email": this.loginEmail, "password":this.loginPassword}).then(
      ()=>{
        this.navCtrl.setRoot(MapPage, {user:{cedula: 0, primernombre: "Pedro", segundonombre: 0, primerapellido: "Pérez", segundoapellido: 0, t_usuario: 2,
          foto: "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png", email: this.loginEmail, telefono: "809-000-0000"}});
      }
    );
  }
  signup(){
    this.fauth.doRegister({"email": this.signupEmail, "password":this.signupPassword}).then(
      ()=>{
        this.http.sendPostRequest({cedula: this.id, primernombre: this.fname, segundonombre: 0, primerapellido: this.lname, segundoapellido: 0, t_usuario: 2,
          foto: 0, email: this.signupEmail, telefono: this.phone}, 'post.php');
        this.navCtrl.setRoot(MapPage, {user: {cedula: this.id, primernombre: this.fname, segundonombre: 0, primerapellido: this.lname, segundoapellido: 0, t_usuario: 2,
          foto: 0, email: this.signupEmail, telefono: this.phone}});
      }
    );
  }

}
