import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicPageModule } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { AuthProvider } from '../../providers/auth/auth';
import {NgModule} from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReceiptPage } from '../receipt/receipt';
/**
 * Generated class for the ChargingMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charging-menu',
  templateUrl: 'charging-menu.html',
})
@NgModule({
  imports: [RoundProgressModule]
})
export class ChargingMenuPage {

  time:String;
  startTime:any;
  user:any;
  current = 25;
  max = 30;
  duration = 0; //0 si el usuario no puso maximo 
  background = '#45ccce'; //#eaeaea si el usuario puso maximo 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socket:WebsocketProvider,
    private afauth:AuthProvider) {
    this.startTime = (navParams.get("Date"))?navParams.get("Date"):new Date();
    //this.startTime = new Date();
    setInterval(this.counter.bind(this), 1000)
    afauth.getUser().subscribe((usr) =>{
      this.user = usr.email;
    })
    this.socket.getMessages().subscribe((data)=>{
      switch(data.Command)
      {
        case "ChargeEndSecured":
          this.navCtrl.setRoot(ReceiptPage, {monto: data.Monto, startTime: this.startTime, endTime: new Date()})
          break;
      }
    })
  }

  counter()
  {
    let currentTime:any = new Date();
    let timeElapsed:any = new Date(currentTime - this.startTime);
    this.time = timeElapsed.getUTCHours() + ':' +
                timeElapsed.getUTCMinutes() + ':' +
                timeElapsed.getUTCSeconds();
  }

  cancelCharge()
  {
    console.log(JSON.stringify({Command:"ChargingCancellation", Email: this.user}));
    this.socket.sendMessage(JSON.stringify({Command:"ChargingCancellation", email: this.user}))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChargingMenuPage');
  }

  getOverlayStyle() {
    let isSemi = true;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? '44%' : '50%',
      'bottom': isSemi ? '10%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size':125 / 3.5 + 'px'
    };
  }

}
