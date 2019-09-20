import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';

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
  userid:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public https:HttpRequestProvider) {
    this.placeLocation = this.navParams.get('location');
    this.userid = this.navParams.get('userid');    
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
    /*to upload the date would be:
      daysArray[+startDate] and daysArray[+endDate]
    */
   let data =
    {UserUserId: this.userid, Direccion: this.stationDir, Horario_Inicio_Operaciones: this.initTimeSlot,
    Horario_Fin_Operaciones: this.endTimeSlot, Dia_Inicio_Operaciones: startDate,
    Dia_Fin_Operaciones: endDate, lat:this.placeLocation.lat(), lng:this.placeLocation.lng(), 
    Desc: this.stationDesc};
    console.log(data);
    this.https.sendPostRequest(data, 'createLugar.php').then((ok) =>{
      console.log(ok);
      this.navCtrl.setRoot(MapPage);
    },(error) =>{
      window.alert(error);
      console.log(error);
    })
  }

}
