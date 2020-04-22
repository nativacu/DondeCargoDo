import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { AuthProvider } from '../../providers/auth/auth';

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
  daysArray:Array<String> = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  dateInit:any;
  dateEnd:any;
  stationName:any;
  stationDir:any;
  stationDesc:any;
  number:any;
  initTimeSlot:any;
  endTimeSlot:any;
  userEmail:any;
  tipo:any = "Minuto";
  user:any;
  maxReservationTimeMin: number;
  maxReservationTimeHrs: number;
  timeToCancelMins: number;
  timeToCancelHrs: number;
  waitingTimeMins: number;
  waitingTimeHrs: number;
  timeBeforeReservationMins: number;
  timeBeforeReservationHrs: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public https:HttpRequestProvider, public socket:WebsocketProvider, public auth:AuthProvider) {
    this.placeLocation = this.navParams.get('location');
    this.userEmail = this.navParams.get('email');
    this.auth.currUser.subscribe((usr) =>{
      this.user = usr;
    });
    this.socket.getMessages().subscribe((data:any) =>{
      switch(data.Command)
      {
        case 'LugarCreationSuccess':
          this.navCtrl.popToRoot();
          break;
        default:
      }
    })
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad RegisterPlugPage');
  }

  setPicker(){

  }

  uploadData(){
      let maxReservationTime = this.maxReservationTimeHrs * 60 + this.maxReservationTimeMin;
      let timeToCancel = this.timeToCancelHrs * 60 + this.timeToCancelMins;
      let waitngTime = this.waitingTimeHrs * 60 + this.waitingTimeMins;
      let timeBetweenReservations = this.timeBeforeReservationHrs * 60 + this.timeBeforeReservationMins;

      let data =
       {Command: "CrearLugar", Email: this.user.Email, Nombre: this.stationName, Direccion: this.stationDir, Horario_Inicio_Operaciones: this.initTimeSlot
       ,Horario_Fin_Operaciones: this.endTimeSlot, Dia_Inicio_Operaciones: this.daysArray[this.dateInit].toLowerCase()
       , Dia_Fin_Operaciones: this.daysArray[this.dateEnd].toLowerCase(), lat: this.placeLocation.lat(), lng: this.placeLocation.lng()
       , Desc: this.stationDesc, Tipo: this.tipo, Costo: this.number
         , TiempoMaximoReserva: maxReservationTime
       , TiempoCancelarReserva: timeToCancel
       , TiempoEsperarReserva: waitngTime
       , TiempoAntelacionReserva: timeBetweenReservations
       };
       this.socket.sendMessage(JSON.stringify(data));
  }

}
