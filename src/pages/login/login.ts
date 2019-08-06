import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MapPage } from '../map/map';
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
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public navCtrl: NavController, public navParams: NavParams, public fauth:AuthProvider) {
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
        this.navCtrl.setRoot(MapPage);
      }
    );
  }
  logout(){
    this.fauth.doLogout();
  }
  signup(){
    this.fauth.doRegister({"email": this.signupEmail, "password":this.signupPassword}).then(
      ()=>{
        this.navCtrl.setRoot(MapPage);
      }
    );
  }

}
