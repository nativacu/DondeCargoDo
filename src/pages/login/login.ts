import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MapPage } from '../map/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { PlatformProvider } from '../../providers/platform/platform';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { OneSignal } from '@ionic-native/onesignal';


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
  loginIp:string;
  signupEmail:string;
  signupPassword:string;
  fname:string;
  lname:string;
  id:string;
  phone: string;
  inputType:string = "password";
  loading:Loading;
  constructor(public platform: PlatformProvider, statusBar: StatusBar, splashScreen: SplashScreen,
              public navCtrl: NavController, public navParams: NavParams, public fauth:AuthProvider,
              public http: HttpRequestProvider, public socket:WebsocketProvider, public onesignal:OneSignal,
              public loadingCtrl:LoadingController) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.getSocketMessages();
  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.loading = this.loadingCtrl.create({
      spinner: "circles",
      content: "Connecting",
    });
    this.loading.present();
    this.socket.startConnection('').then(() =>{
      this.getSocketMessages();
      this.fauth.doLogin({"email": this.loginEmail, "password":this.loginPassword}).then(
        ()=>{
          if(this.platform.checkPlatform()){
            this.loading.setDuration(5000);
            new Promise<any>((resolve, reject) =>{
              this.loading.onDidDismiss(() =>{
                reject("El servicio de notificaciones no esta disponible");
              });

              this.onesignal.getIds().then((idData) =>{
                resolve(idData);
              })
            }).then((idData) =>{
              this.socket.sendMessage(JSON.stringify({Command:"CrearConexion", Email: this.loginEmail, OneSignalId: idData.userId}));
            }, (error) =>{
              window.alert(error);
            })
          }
          else
          {
            this.socket.sendMessage(JSON.stringify({Command:"CrearConexion", Email: this.loginEmail, OneSignalId: 0}));
          }
        },
        (error) =>{
          window.alert(error);
          this.loading.dismiss();
        }
      );
    }, (error) =>{
      window.alert(error);
      this.loading.dismiss();
    })
  }
  getImage(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((ImageData=>{
       this.base64img="data:image/jpeg;base64,"+ImageData;
    }),error=>{
      console.log(error);
    })
  }
  updateWebImg(input){
    this.webImg = input.files.item(0)
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

  showHide()
  {
    this.inputType = this.inputType == "text"? "password":"text";
  }

  getSocketMessages(){
    this.socket.getMessages().subscribe((data:any) => {
      this.loading.dismiss();
      switch(data.Command)
      {
        case "ConexionCreated":
            this.fauth.currUser.next(data);
            this.navCtrl.setRoot(MapPage);
            break;
        default:
          break;
      }
    })
  }

}
