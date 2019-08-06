import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { checkAvailability } from '@ionic-native/core';


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
  selectedTimeSlot: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpRequestProvider) {
    this.charger = navParams.get('charger');
    this.showCost = true;
  }

  ionViewDidLoad() {
    this.displayName = this.charger.charger_name;
    this.cost = this.charger.cost;
    this.costType = this.charger.cost_type;
    this.potency = this.charger.potency;
    this.chargerType = this.charger.type;

    if(this.costType === "Gratis"){
      this.showCost = false;
    }
    
  }

  reserve(){
    
    let postData = {
      "charger": this.charger,
      "time_slot": this.selectedTimeSlot
    }
    if(checkAvailability){
      this.http.sendPostRequest(postData);
    }
  }

  checkAvailability(){
    let locations = this.http.makeStationRequest();

    locations.subscribe(data => {
      let index = data.indexOf(this.charger); ; 
      if(data[this.charger].is_operational){
        return true;
      }

      else{
        return false;
      }

    });
    
  }


}
