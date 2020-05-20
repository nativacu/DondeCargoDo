import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { PlacePlugPage } from '../pages/place-plug/place-plug';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
import { ChargersPage } from '../pages/chargers/chargers';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

enum account {
  placeOwner = 1,
  consumer = 2,
  hybrid = 3
}

@Component({
  templateUrl: 'app.html'
})
export class LocationsApp {
  @ViewChild('mycontent') nav: NavController;
  user:any;
  rootPage:any = LoginPage;
  userName: string;
  imageSrc: string;
  email: string;
  lname: string;
  accountType: account.consumer;
  loggedIn: boolean = false;
  editing: boolean = false;

  phoneNumber: string;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public fauth:AuthProvider,
    public http: HttpRequestProvider,
    public socket:WebsocketProvider,
    private alertCtrl: AlertController,
    private oneSignal: OneSignal,
    private camera: Camera) {

   //  this.push.hasPermission()
  // .then((res: any) => {

  //   if (res.isEnabled) {
  //     console.log('We have permission to send push notifications');
  //   } else {
  //     console.log('We do not have permission to send push notifications');
  //   }

  // });

  this.fauth.currUser.subscribe((usr)=> {
    this.user = usr;
    if(this.user){
      this.loggedIn = true;
        this.imageSrc = this.user.Foto;
        this.accountType = +this.user.TipoUsuario;
        if(this.imageSrc == null || this.imageSrc == "NULL")
        {
          this.imageSrc = "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
        }
        this.userName = this.user.PrimerNombre;
        this.lname = this.user.PrimerApellido;
        this.phoneNumber = this.user.Telefono;
      }

   });

    fauth.getUser().subscribe(user =>{
      this.email = user.email;
    });

    platform.ready().then(() => {
      // emailObserveray, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (isCordovaAvailable()){
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }

      /*socket.getMessages().subscribe((data:any) => {
        console.log(data)
        switch(data.Command)
        {
          case 'ChargeInitRequest':
           //iniciar carga
            this.nav.push(ChargeConfirmationPage, {data:data});
            break;
          case 'ChargeInitSecured':
            //carga iniciada
            this.nav.push(ChargingMenuPage, {Date:new Date()});
            break;
          case 'ChargeEndSecured':
            //fin de la carga
            this.nav.popToRoot();
            break;
          case "ConexionCreated":
            this.fauth.currUser.next(data[0]);
            this.nav.setRoot(MapPage);
            break;
          case "TransactionRequest":
            this.nav.push(TransactionListPage, {data:data})
            break;
          default:
        }
      });*/

    });
  }


  takePicture(){
    console.log("still working");
  }

  eraseAccount(){
    //TODO change http for socket send
    //this.http.sendPostRequest({email: this.email},'delete.php');
  }

  openGallery (): void {
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
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }


  changePhoneNumber(){
    var currentNo = document.getElementById("phoneNumber");
    var input = document.getElementById("phoneInput");
    //currentNo.style.display = "none";
    //input.style.display="inherit";
  }

  showInfo(){
    this.editing = false;
    this.user.Command = 'UpdateUserInfo';
    this.user.Foto = this.imageSrc;
    this.user.PrimerNombre = this.userName;
    this.user.Telefono = this.phoneNumber;
    this.socket.sendMessage(JSON.stringify(this.user));
    this.fauth.currUser.next(this.user);
    // this.http.sendPostRequest({primernombre: this.userName, segundonombre: 0, primerapellido: 'Perez', segundoapellido: 0, t_usuario: 2,
    //   foto: 0, email: this.email, telefono: this.phoneNumber},'Update.php');
  }

  enableEdit(){
    this.editing = true;
  }

  logout()
  {
    this.fauth.doLogout();
    this.socket.sendMessage({Command:'LogOut'});
    this.nav.setRoot(LoginPage);
  }
  addNewStation()
  {
    this.nav.push(PlacePlugPage, {email: this.email});
  }
  private onPushReceived(payload: OSNotificationPayload) {

  }

  private onPushOpened(payload: OSNotificationPayload) {
      let alert = this.alertCtrl.create({
        title: 'Carga Recibida',
        message: 'Se ha detectado una conexión para cargar su vehículo. ¿Desea iniciar la carga?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.socket.sendMessage(JSON.stringify({Command:"ChargingConfirmation", Confirmation: "N" , PlugID: payload.additionalData.PlugID}));
            }
          },
          {
            text: 'Sí',
            handler: () => {
              //this.nav.push(ChargeConfirmationPage, {data:payload.additionalData});
              //window.alert(JSON.stringify(payload.additionalData));
              this.socket.sendMessage(JSON.stringify({Command:"ChargingConfirmation", Confirmation: "Y" , PlugID: payload.additionalData.PlugID}));
            }
          }
        ]
      });
      alert.present();
    }

    showAllTransactions(){
        this.socket.sendMessage(JSON.stringify({Command:"InitTransactionRequest", Email: this.user.Email}));
    }

    chargers(){
      this.nav.push(ChargersPage);
    }

    showAllReserves(){
      this.socket.sendMessage(JSON.stringify({Command: "InitReservacionRequest", Email: this.user.Email}));
    }

}

