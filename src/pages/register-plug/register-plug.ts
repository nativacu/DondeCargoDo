import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';
import { AddPlugPage } from '../add-plug/add-plug';

/**
 * Generated class for the RegisterPlugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-plug',
  templateUrl: 'register-plug.html',
})
export class RegisterPlugPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  placeLocation: any;
  daysArray:Array<String> = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  dateInit:any
  dateEnd:any
  stationName:any;
  stationDir:any;
  stationDesc:any;
  number:any;
  initTimeSlot:any;
  endTimeSlot:any;
  userEmail:any;
  tipo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public https:HttpRequestProvider) {
    this.placeLocation = this.navParams.get('location');
    this.userEmail = this.navParams.get('email');    
    console.log(this.placeLocation.lng());

  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad RegisterPlugPage');
  }

  setPicker(){
    
  }
  
  uploadData(){
    let startDate = (this.dateInit < this.dateEnd? this.dateInit:this.dateEnd);
    let endDate = (this.dateInit > this.dateEnd? this.dateInit:this.dateEnd);
    console.log(this.tipo)
    this.https.sendPostRequest({email: this.userEmail}, 'get.php').then((user:any) =>{
      let data =
       {UserUserId: user.id, Nombre: this.stationName, Direccion: this.stationDir, Horario_Inicio_Operaciones: this.initTimeSlot,
       Horario_Fin_Operaciones: this.endTimeSlot, Dia_Inicio_Operaciones: this.daysArray[startDate],
       Dia_Fin_Operaciones: this.daysArray[endDate], lat:this.placeLocation.lat(), lng:this.placeLocation.lng(), 
       Desc: this.stationDesc, Tipo: this.tipo, Costo: this.number};
       console.log(data);

       let a = 5;
         this.navCtrl.setRoot(AddPlugPage, {lugarid: a});
       
       this.https.sendPostRequest(data, 'createLugar.php').then((ok:any) =>{
         console.log(ok);
         this.navCtrl.setRoot(AddPlugPage, {lugarid: ok.LugarID});
       },(error) =>{
         window.alert(error);
         console.log(error);
       })
     },
     (kabum) =>{
    });
  }

}
