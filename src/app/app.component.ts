import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MapPage} from '../pages/map/map'
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpRequestProvider } from '../providers/http-request/http-request';

@Component({
  templateUrl: 'app.html',
})
export class LocationsApp {
  @ViewChild('mycontent') nav: NavController;
  user:any;
  rootPage:any = LoginPage;
  userName: string;
  imageSrc: string;
  email: string;
  lname: string;
  accountType: 0;
  phoneNumber: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fauth:AuthProvider, public http: HttpRequestProvider) {
   // this.user = fauth;
   this.fauth.currUser.subscribe((usr)=> {
     console.log(usr);
      this.user = usr;
      if(this.user){
        this.imageSrc = this.user.Foto;
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
      }
      
   });

    fauth.getUser().subscribe(user =>{
      if(this.user)
        this.email = user.email;
    })
    console.log(platform);

    platform.ready().then(() => {
      // emailObserveray, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  takePicture(){
    console.log("still working");
  }

  eraseAccount(){
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
  
  login()
  {

  }
  logout()
  {
    console.log("ok");
    this.fauth.doLogout();
    this.nav.setRoot(LoginPage)
  }
}

