import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RegisterPlugPage } from '../register-plug/register-plug';
import { PlacePlugPage } from '../place-plug/place-plug';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
enum account {
  placeOwner = '1',
  consumer = '2',
  hybrid = '3'
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  signupEmail:string;
  signupPassword:string;
  fname:string;
  sname: string;
  lname:string;
  slname: string;
  id:string;
  phone: string;
  accountType: Array<String>;
  imageSrc: any;
  picture: HTMLImageElement;


  constructor(public navCtrl: NavController, private plt: Platform, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider) {
    this.accountType = [account.consumer];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){
    console.log(this.accountType);
    let type = 0;

    for(let x of this.accountType)
    {
      type += +x;
    }
    
    this.fauth.doRegister({"email": this.signupEmail, "password":this.signupPassword}).then(
      (user:firebase.User)=>{

        if(this.slname === null){
          this.slname = '0';
        }

        this.http.sendPostRequest({cedula: this.id, primernombre: this.fname, segundonombre: this.sname, primerapellido: this.lname, segundoapellido: this.slname, 
          t_usuario: type, foto: 0, email: this.signupEmail, telefono: this.phone}, 'post.php').then((data:any) =>{
            this.fauth.currUser.next(data);
            console.log(data)
            if(type == 1 || type == 3)
            {
              this.navCtrl.push(PlacePlugPage, {id: data});
            }
            else{
              this.navCtrl.setRoot(MapPage);
            }
          },
          (kabum) =>{
            console.log(kabum)
            if(user)
              user.delete();
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
  }

  selectPicture(){
    this.picture = document.getElementById('profilePic') as HTMLImageElement;

    console.log(this.picture.src);

    // if(this.plt.platforms[0] != 'browser'){
      //   let cameraOptions = {
      //   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      //   destinationType: Camera.DestinationType.FILE_URI,      
      //   quality: 100,
      //   targetWidth: 1000,
      //   targetHeight: 1000,
      //   encodingType: Camera.EncodingType.JPEG,      
      //   correctOrientation: true
      // }
    
      // Camera.getPicture(cameraOptions)
      //   .then(file_uri => this.picture = file_uri,
      //   err => console.log(err));  
    // }

    // else{

    // }
  

    
    
  }

}
