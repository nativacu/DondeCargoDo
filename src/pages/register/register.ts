import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RegisterPlugPage } from '../register-plug/register-plug';
import { PlacePlugPage } from '../place-plug/place-plug';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validators';

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

  
  imageSrc: any;
  picture: HTMLImageElement;
  registerForm:FormGroup;

  constructor(public navCtrl: NavController, private plt: Platform, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider, public formBuilder:FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])],
      fname: ['', Validators.required],
      sname: [''],
      lname: ['', Validators.required],
      slname: [''],
      telNumber: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.phone_number)
      ])],
      uniqueId: ['', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.id)
      ])],
      accountType: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){
    console.log(this.registerForm.controls['accountType']);
    let type = 0;

    for(let x of this.registerForm.controls['accountType'].value)
    {
      type += +x;
    }
    console.log(type)
    /*this.fauth.doRegister({"email": this.registerForm.controls['email'].value, "password":this.registerForm.controls['password'].value}).then(
      (user:firebase.User)=>{
        var slname = this.registerForm.controls['slname'].value
        var sname = this.registerForm.controls['sname'].value
        if(sname === null){
          sname = '0';
        }
        if(slname === null){
          slname = '0';
        }

        this.http.sendPostRequest({cedula: this.registerForm.controls['uniqueId'].value, primernombre: this.registerForm.controls['fname'].value, segundonombre: sname, primerapellido: this.registerForm.controls['lname'].value, segundoapellido: slname, 
          t_usuario: type, foto: 0, email: this.registerForm.controls['email'].value, telefono: this.registerForm.controls['telNumber'].value}, 'post.php').then((data:any) =>{
            this.fauth.currUser.next(data);
            console.log(data)
            */
            if(type == 1 || type == 3)
            {
              this.navCtrl.push(PlacePlugPage, {email: this.registerForm.controls['email'].value});
            }
            else{
              this.navCtrl.setRoot(MapPage);
            }
            /*
          },
          (kabum) =>{
            console.log(kabum)
            console.log(user)
            if(user.email)
              user.delete();
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
    */
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
