import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MapPage } from '../map/map';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  base64img:any;
  loading: any;
  webImg:any;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public navCtrl: NavController, public navParams: NavParams, public fauth:AuthProvider, 
    public http: HttpRequestProvider, private transfer: FileTransfer, private camera: Camera, 
    public loadingCtrl: LoadingController, public modal: ModalController) {

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
        this.http.sendPostRequest({email: this.loginEmail}, 'get.php').then((data) =>{
            this.fauth.currUser.next(data[0]);
            this.navCtrl.setRoot(MapPage);
          },
          (kabum) =>{
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
  }
  signup(){
    let photo = (this.platform.is('core'))? this.webImg : this.base64img;
    this.fauth.doRegister({"email": this.signupEmail, "password":this.signupPassword}).then(
      (user:firebase.User)=>{
        this.http.sendPostRequest({cedula: this.id, primernombre: this.fname, segundonombre: 0, primerapellido: this.lname, segundoapellido: 0, t_usuario: 2,
          foto: photo, email: this.signupEmail, telefono: this.phone}, 'post.php').then((data) =>{
            this.fauth.currUser.next(data);
            this.navCtrl.setRoot(MapPage);
          },
          (error) =>{
            user.delete();
            window.alert(error);
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
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
    console.log("i made it");
    const registerModal = this.modal.create('RegisterPage');
    registerModal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
   
  }

}
