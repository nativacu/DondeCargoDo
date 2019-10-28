import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
        case 'LugaresRetreived':
          this.checkCharger(data)
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
      "UserUserID": this.userId,
      "IOTPlugPlugID": this.charger.id, //TODO this.charger.id contains placeID not plugID 
      "Fecha": this.dateSlot,
      "Hora_Inicio": this.initTimeSlot,
      "Hola_Fin": this.endTimeSlot
    }
    if(checkAvailability){
      this.http.sendPostRequest(postData, 'reservations');
    }
  }

  checkCharger(data){
    let index = data.indexOf(this.charger); ; 
    if(data[this.charger]==1){
      return true;
    }
    else{
      return false;
    }
  }

  checkAvailability(){
    //let locations = this.http.makeStationRequest();
    this.socket.sendMessage('{"Command":"GetLugares"}')
    
  }


}
