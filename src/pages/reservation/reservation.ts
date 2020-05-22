import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { checkAvailability } from '@ionic-native/core';
import { AuthProvider } from '../../providers/auth/auth';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { Reserva } from '../../models/reserva';
import { PlugScheduleProvider } from '../../providers/plug-schedule/plug-schedule';


/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})

export class ReservationPage {

  @ViewChild('charger') chargerElement: ElementRef;

  charger: any;
  months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  displayName: any;
  cost: any;
  costType: any;
  chargerType: any;
  showCost: boolean;
  initTimeSlot: any;
  endTimeSlot: any;
  dateSlot: string;
  user: any;
  currentDate: string;
  hoursOk:Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthProvider, public socket:WebsocketProvider, private alertCtrl: AlertController,  private plugScheduleProvider: PlugScheduleProvider) {
    this.charger = navParams.get('charger');
    this.hoursOk = false;
    this.showCost = true;

    this.auth.currUser.subscribe((user)=>{
      this.user = user;
    });

    this.socket.getMessages().subscribe(async (data:any) => {
      let title: string;
      let message: string;
      let date: string;
      switch(data.Command)
      {
        case 'SuccessReserva':
          date = data.Fecha.split('-');
          title = 'Reserva exitosa';
          message = 'Por favor presentarse en el plug ' + data.PlugID + ' a las ' + data.Hora_Inicio + ' el día ' + date[2] + ' de ' + this.months[+date[1] - 1];
          break;
        case 'ErrorReserva':
          // TODO: show free hours
          title = 'Ningún cargador reservado';
          message = 'Lo sentimos, la hora seleccionada ya ha sido reservada. Intente nuevamente con otro horario';
          break;
        case 'HorariosRetrieved':
          this.plugScheduleProvider.plugSlots.next(data.Horarios);
          break;
        default:
          break;

      }
      if(title && message){
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: ['OK']
        });
        await alert.present();
      }

    });
  }

  ionViewDidLoad() {

    this.currentDate = new Date().toISOString().split('T')[0];
    this.dateSlot = this.currentDate;
    this.displayName = this.charger.Nombre;
    this.cost = this.charger.CostoCarga;
    this.costType = this.charger.TipoCostoCarga;
    this.sendPlaceInfo();
    // this.potency = this.charger.potency;
    // this.chargerType = this.charger.type;

    if(this.costType === "Gratis"){
      this.showCost = false;
    }

    this.initTimeSlot = this.endTimeSlot = this.charger.Hora_Inicio_Operaciones;

  }

  reserve(){
    if(!this.validateInput()){
      return;
    }

    let postData = {
      "Command": "CreateReserva",
      "Email": this.user.Email,
      "LugarID": +this.charger.LugarID,
      "Fecha": this.dateSlot,
      "Hora_Inicio": this.initTimeSlot,
      "Hora_Fin": this.endTimeSlot
    };
    this.socket.sendMessage(JSON.stringify(postData));

  }

  sendPlaceInfo(){
    this.plugScheduleProvider.chosenCharger.next(this.charger);
    let postData = {
      "Command": "GetHorariosPlugs",
      "Fecha": this.dateSlot,
      "LugarID": +this.charger.LugarID
    };
    this.socket.sendMessage(JSON.stringify(postData));
  }

  updatePicker(value:any)
  {
    this.dateSlot = value;
  }

  validateInput(): boolean {
    return this.endTimeSlot > this.initTimeSlot && this.initTimeSlot >= this.charger.Hora_Inicio_Operaciones && this.endTimeSlot <= this.charger.Hora_Fin_Operaciones;
  }
  validateHours()
  {
    if(this.initTimeSlot == undefined || this.endTimeSlot == undefined)
      this.hoursOk = false;
    else{
      var initArr:Array<String> = this.initTimeSlot.split(":");
      var hoursInit:any = +initArr[0]*60 + +initArr[1];
      var endArr:Array<String> = this.endTimeSlot.split(":");
      var hoursEnd:any = +endArr[0]*60 + +endArr[1];
      this.hoursOk = (hoursEnd - hoursInit) <= this.charger.TiempoMaximoReserva;

    }
  }

}
