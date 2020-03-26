import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { AuthProvider } from '../../providers/auth/auth';
import {NgModule} from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { ReceiptPage } from '../receipt/receipt';
import { AlertController } from 'ionic-angular';
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
  timeElapsed: Date;
  startTime:any;
  user:any;
  current = 1;
  max = 100;
  duration = 20; //0 si el usuario no puso maximo
  background = '#eaeaea'; //#eaeaea si el usuario puso maximo

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socket:WebsocketProvider,
    private afauth:AuthProvider,
    private alertCtrl: AlertController) {
    this.startTime = (navParams.get("Date"))?navParams.get("Date"):new Date();

    setInterval(this.counter.bind(this), 1000);

    setInterval(this.progress.bind(this), 50);

    afauth.getUser().subscribe((usr) =>{
      this.user = usr.email;
    });
    this.socket.getMessages().subscribe((data)=>{
      switch(data.Command)
      {
        case "ChargeEndSecured":
          let dateEnd:String = data.Fecha_Fin;
          let datePar = dateEnd.split('-');
          let hourEnd:String = data.Hora_Fin;
          let hourPar = hourEnd.split(':');
          this.navCtrl.push(ReceiptPage, {monto: data.Monto, startTime: this.startTime, endTime: new Date(+datePar[0], +datePar[1] - 1, +datePar[2], +hourPar[0], +hourPar[1])});
          break;
      }
    })
  }

  counter()
  {
    let currentTime:any = new Date();
    this.timeElapsed = new Date(currentTime - this.startTime);
    let elapseHour:number = Math.floor(this.timeElapsed.getTime()/3600000);
    let elapseMinute:number = Math.floor((this.timeElapsed.getTime()/60000)%60);
    let elapseSecond:number = Math.floor((this.timeElapsed.getTime()/1000)%60);
    this.time = (elapseHour < 10?'0':'') + elapseHour + ':' +
                (elapseMinute < 10?'0':'') + elapseMinute + ':' +
                (elapseSecond < 10?'0':'') + elapseSecond
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


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Detener',
      message: '¿Desea detener la carga?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log(JSON.stringify({Command:"ChargingCancellation", Email: this.user}));
            this.socket.sendMessage(JSON.stringify({Command:"ChargingCancellation", Email: this.user}))
          }
        }
      ]
    });
    alert.present();
  }

  progress() {

    this.current += 0.1;

    if(this.current >= this.max){
      this.current = 1;
    }

  }


}
