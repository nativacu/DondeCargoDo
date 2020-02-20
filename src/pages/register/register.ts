import { Component, PlatformRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  loading:Loading;
  constructor(public navCtrl: NavController, private plt: PlatformProvider, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider, public formBuilder:FormBuilder,
    public socket:WebsocketProvider, public loadingCtrl:LoadingController) {

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup() {
    this.loading = this.loadingCtrl.create({
      spinner: "circles",
      content: "Connecting",
    });
    this.loading.present();
    this.socket.startConnection('').then(() => {
      this.getMessages();
      let type = 0;
      for (const x of this.registerForm.controls.accountType.value) {
        type += +x;
      }
      this.fauth.doRegister({email: this.registerForm.controls.email.value, password: this.registerForm.controls.password.value}).then(
        (user) => {
          console.log(user);
          let slname = this.registerForm.controls.slname.value;
          let sname = this.registerForm.controls.sname.value;
          if (sname === null) {
            sname = '0';
          }
          if (slname === null) {
            slname = '0';
          }
        // TODO: needs to check about t_usuario
          const dataToSend = {Command: 'CrearUser', Cedula: this.registerForm.controls.uniqueId.value , PrimerNombre: this.registerForm.controls.fname.value, SegundoNombre: sname, PrimerApellido: this.registerForm.controls.lname.value, SegundoApellido: slname
          , TipoUsuario: type, Foto: 0, Email: this.registerForm.controls.email.value, Telefono: this.registerForm.controls.telNumber.value};
          this.socket.sendMessage(JSON.stringify(dataToSend));
          window.alert("Usuario creado exitosamente. Por favor inicie sesión");
        },
        (error) => {
          window.alert(error);
          this.loading.dismiss();
        }
      );
    }, (error) => {
      window.alert(error);
      this.loading.dismiss();
    });
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

  getMessages(){
    this.socket.getMessages().subscribe((data:any) =>{
      this.loading.dismiss();
      switch(data.Command)
      {
        case 'UserCreationSuccess':
          this.fauth.currUser.next(data);
          this.navCtrl.setRoot(LoginPage);
          break;
        case 'UserCreationFailure':
          this.fauth.afAuth.auth.currentUser.delete();
        default:
          break;
      }
    })
  }

}
