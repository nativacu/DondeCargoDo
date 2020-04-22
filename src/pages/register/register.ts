import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
    public socket:WebsocketProvider, public loadingCtrl:LoadingController, private camera:Camera) {

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

          const dataToSend = {
            Command: 'CrearUser',
            Cedula: this.registerForm.controls.uniqueId.value,
            PrimerNombre: this.registerForm.controls.fname.value,
            SegundoNombre: sname,
            PrimerApellido: this.registerForm.controls.lname.value,
            SegundoApellido: slname,
            TipoUsuario: type,
            Foto: this.imageSrc,
            Email: this.registerForm.controls.email.value,
            Telefono: this.registerForm.controls.telNumber.value
          };

          this.socket.sendMessage(JSON.stringify(dataToSend));
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
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      };

      this.camera.getPicture(options).then((imageData) => {
        this.imageSrc = 'data:image/jpeg;base64,' + imageData;
        this.picture.src = this.imageSrc;
      }, (err) => {
        console.log(err);
        // Handle error
      });
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
          window.alert("Usuario creado exitosamente. Por favor inicie sesión");
          this.fauth.currUser.next(data);
          this.navCtrl.popToRoot();
          break;
        case 'UserCreationFailure':
          this.fauth.afAuth.auth.currentUser.delete();
          break;
        default:
          break;
      }
    })
  }

}
