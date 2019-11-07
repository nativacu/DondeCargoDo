import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RegisterPlugPage } from '../register-plug/register-plug';
import { PlacePlugPage } from '../place-plug/place-plug';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators, uniqueIdValidator } from '../validators/validators';
import { PlatformProvider } from '../../providers/platform/platform';
import { WebsocketProvider } from '../../providers/websocket/websocket';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
enum account {
  placeOwner = 1,
  consumer = 2,
  hybrid = 3
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
  constructor(public navCtrl: NavController, private plt: PlatformProvider, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider, public formBuilder:FormBuilder,
    public socket:WebsocketProvider) {
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
        Validators.pattern(regexValidators.id),
        uniqueIdValidator.uniqueID
      ])],
      accountType: ['', Validators.required]
    });
    this.socket.getMessages().subscribe((data:any) =>{
      switch(data.Command)
      {
        case 'UserCreationSuccess':
          this.fauth.currUser.next(data);
          this.navCtrl.setRoot(MapPage);
        case 'UserCreationFailure':
          this.fauth.afAuth.auth.currentUser.delete();
        default:
          break;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){
    let type = 0;
    for(let x of this.registerForm.controls['accountType'].value)
    {
      type += +x;
    }
    this.fauth.doRegister({"email": this.registerForm.controls['email'].value, "password":this.registerForm.controls['password'].value}).then(
      (user:firebase.User)=>{
        var slname = this.registerForm.controls['slname'].value
        var sname = this.registerForm.controls['sname'].value
        if(sname === null){
          sname = '0';
        }
        if(slname === null){
          slname = '0';
        }
        //TODO: needs to check about t_usuario
        let dataToSend = {Command: "CrearUser", Cedula: this.registerForm.controls['uniqueId'].value , PrimerNombre: this.registerForm.controls['fname'].value, SegundoNombre: sname, PrimerApellido: this.registerForm.controls['lname'].value, SegundoApellido: slname 
        , t_usuario: type, Foto: 0, Email: this.registerForm.controls['email'].value, telefono: this.registerForm.controls['telNumber'].value}
        this.socket.sendMessage(JSON.stringify(dataToSend));
      },
      (error) =>{
        window.alert(error);
      }
    );
    
  }

  selectPicture(){
    this.picture = document.getElementById('profilePic') as HTMLImageElement;

    console.log(this.picture.src);

    if(this.plt.isMobile){
      //   let cameraOptions = {
      //   sourceType: Camera.Picti.PHOTOLIBRARY,
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
    }

    else{

    }
  

    
    
  }

}
