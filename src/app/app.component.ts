import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPage } from '../pages/map/map'
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { PlacePlugPage } from '../pages/place-plug/place-plug';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ChargeConfirmationPage } from '../pages/charge-confirmation/charge-confirmation';
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
  
  phoneNumber: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fauth:AuthProvider, 
    public http: HttpRequestProvider, public socket:WebsocketProvider, private push: Push, alertCtrl: AlertController,
    /*private localNotifications: LocalNotifications*/) {
   // this.user = fauth;

   socket.getMessages().subscribe((data:any) => {
    switch(data.Command)
    {
      case 'ChargeInitRequest':
        //iniciar carga
        this.nav.push(ChargeConfirmationPage, {data:data});
        break;
      case 'ChargeInitSecured':
        //carga iniciada
        break;
      case 'ChargeEndSecured':
        //fin de la carga
        break;
      default:
    }
   });

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
      else
      {
        this.imageSrc = "https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png";
        this.userName = "Pedro";
        this.lname = "Pérez"
        this.email = "pedrop@gmail.com";
        this.phoneNumber = "809-000-0000";
        this.accountType = 1;
      }
      
   });

    fauth.getUser().subscribe(user =>{
      this.email = user.email;
    })

    platform.ready().then(() => {
      // emailObserveray, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      };
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      pushObject.on('error').subscribe((error) => console.log('Error with Push plugin', error));

      /*this.localNotifications.on('click').subscribe( (notification) => {
        let json = JSON.parse(notification.data);
   
        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      });*/
    });
  }



  takePicture(){
    console.log("still working");
  }

  eraseAccount(){
    //TODO change http for socket send
    this.http.sendPostRequest({email: this.email},'delete.php');
  }

  openGallery (): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    Camera.getPicture(cameraOptions)
      .then(FILE_URI => this.imageSrc = FILE_URI, 
      err => console.log(err));   
  }


  changeName(){
    var currentName = document.getElementById("name");
    var input = document.getElementById("input");
    currentName.style.display = "none";
    input.style.display="inherit";
  }
  
  changeMail(){
    // var currentMail = document.getElementById("mail");
    // var input = document.getElementById("mailInput");
    // currentMail.style.display = "none";
    // input.style.display="inherit";
  }

  changePhoneNumber(){
    var currentNo = document.getElementById("phoneNumber");
    var input = document.getElementById("phoneInput");
    currentNo.style.display = "none";
    input.style.display="inherit";
  }

  showInfo(){
    var currentName = document.getElementById("name");
    var input = document.getElementById("input");
    var currentMail = document.getElementById("mail");
    var mailInput = document.getElementById("mailInput");
    var currentNo = document.getElementById("phoneNumber");
    var phoneInput = document.getElementById("phoneInput");
    var saveButton = document.getElementById("saveButton");
    var editIcon = document.getElementById("editIcon");
    var editIcon1 = document.getElementById("editIcon1");
    var editIcon2 = document.getElementById("editIcon2");
    var editButton = document.getElementById("editButton");

    editButton.style.display = "inline";
    //editButton.style.visibility = "visible"
    currentName.style.display = "inherit";
    currentMail.style.display = "inherit";
    currentNo.style.display = "inherit";

    input.style.display="none";
    mailInput.style.display="none";
    phoneInput.style.display="none";
    saveButton.style.display="none";
    //saveButton.style.visibility="hidden";
    editIcon.style.display="none";
    editIcon1.style.display="none";
    editIcon2.style.display="none";
    //TODO change http for socket send
    this.http.sendPostRequest({primernombre: this.userName, segundonombre: 0, primerapellido: 'Perez', segundoapellido: 0, t_usuario: 2,
      foto: 0, email: this.email, telefono: this.phoneNumber},'Update.php');
  }

  enableEdit(){
    var saveButton = document.getElementById("saveButton");
    var editIcon = document.getElementById("editIcon");
    var editIcon1 = document.getElementById("editIcon1");
    var editIcon2 = document.getElementById("editIcon2");
    var editButton = document.getElementById("editButton");

    //saveButton.style.visibility="visible";
    saveButton.style.display="inline";
    editIcon.style.display="inline";
    editIcon1.style.display="inline";
    editIcon2.style.display="inline";
    editButton.style.display="none";
    //editButton.style.visibility = "hidden";
  }
  
  logout()
  {
    this.fauth.doLogout();
    this.socket.sendMessage({Command:'LogOut'})
    this.nav.setRoot(LoginPage); 
  }
  addNewStation()
  {
    this.nav.push(PlacePlugPage, {email: this.email});
  }
}

