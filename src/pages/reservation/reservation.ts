import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { checkAvailability } from '@ionic-native/core';
import { AuthProvider } from '../../providers/auth/auth';
import { WebsocketProvider } from '../../providers/websocket/websocket';


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
  displayName: any;
  cost: any;
  costType: any;
  potency: any;
  chargerType: any;
  showCost: boolean;
  initTimeSlot: any;
  endTimeSlot: any;
  dateSlot: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpRequestProvider, private auth: AuthProvider, public socket:WebsocketProvider) {
    this.charger = navParams.get('charger');
    this.showCost = true;

    this.auth.currUser.subscribe((user)=>{
      this.userId = user.UserID;
    });
    this.socket.getMessages().subscribe((data:any) => {
      switch(data.Command)
      {
        case 'SuccessReserva':
          // TODO: present success message
          window.alert("La reserva se ha realizado con exito");
          break;
        case 'ErrorReserva':
          // TODO: show free hours
          window.alert("Lo sentimos, la hora seleccionada ya ha sido reservada");
          break;
        default:
      }
    })
  }

  ionViewDidLoad() {
    this.displayName = this.charger.Nombre;
    this.cost = this.charger.CostoCarga;
    this.costType = this.charger.TipoCostoCarga;
    // this.potency = this.charger.potency;
    // this.chargerType = this.charger.type;

    if(this.costType === "Gratis"){
      this.showCost = false;
    }

  }

  reserve(){

    let postData = {
      "Command": "CreateReserva",
      "UserID": this.userId,
      "LugarID": this.charger.id, //TODO this.charger.id contains placeID not plugID
      "Fecha": this.dateSlot,
      "Hora_Inicio": this.initTimeSlot,
      "Hora_Fin": this.endTimeSlot
    };
    this.socket.sendMessage(JSON.stringify(postData));

  }

}
