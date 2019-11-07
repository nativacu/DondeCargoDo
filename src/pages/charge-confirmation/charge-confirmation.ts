import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';

/**
 * Generated class for the ChargeConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charge-confirmation',
  templateUrl: 'charge-confirmation.html',
})
export class ChargeConfirmationPage {
  placeData:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public websocket:WebsocketProvider) {
    this.placeData = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChargeConfirmationPage');
  }

  sendResponse(response:any)
  {
    this.websocket.sendMessage(JSON.stringify({Command:"ChargingConfirmation", Confirmation:(response==1?"Y":"N") , PlugID: + this.placeData.PlugID}));
  }
}
