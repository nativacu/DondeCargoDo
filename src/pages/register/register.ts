import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public fauth: AuthProvider, public http: HttpRequestProvider) {
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
          t_usuario: type, foto: 0, email: this.signupEmail, telefono: this.phone}, 'post.php').then((data) =>{
            this.fauth.currUser.next(data);
            this.navCtrl.setRoot(MapPage);
          },
          (kabum) =>{
            user.delete();
          });
      },
      (error) =>{
        window.alert(error);
      }
    );
  }


}
