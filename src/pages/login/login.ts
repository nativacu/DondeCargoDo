import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MapPage } from '../map/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { BehaviorSubject } from 'rxjs';
import { PlatformProvider } from '../../providers/platform/platform';
import { WebsocketProvider } from '../../providers/websocket/websocket';
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
export class LoginPage implements OnInit{

  loginEmail:string;
  loginPassword:string;
  signupEmail:string;
  signupPassword:string;
  fname:string;
  lname:string;
  id:string;
  phone: string;
  constructor(public platform: PlatformProvider, statusBar: StatusBar, splashScreen: SplashScreen, public navCtrl: NavController, 
    public navParams: NavParams, public fauth:AuthProvider, public http: HttpRequestProvider, private modal: ModalController,
    public socket:WebsocketProvider) {

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
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.socket.getMessages().subscribe((data:any) => {
      console.log(data)
      switch(data.Command)
      {
        case "ConexionCreated":
            this.fauth.currUser.next(data[0]);
            this.navCtrl.setRoot(MapPage);
        default:
          break;
      }
    })
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.fauth.doLogin({"email": this.loginEmail, "password":this.loginPassword}).then(
      ()=>{
        this.socket.sendMessage('{"Command":"CrearConexion","Email":' + '\"' + this.loginEmail + '\"' + '}');
      },
      (error) =>{
        window.alert(error);
      }
    );
  }

  openRegister(){
    this.navCtrl.push('RegisterPage');
    //const registerModal = this.modal.create('RegisterPage');
    //registerModal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
   
  }

}
