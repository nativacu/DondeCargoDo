import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { AuthProvider } from '../../providers/auth/auth';

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
export class ChargingMenuPage {

  time:String;
  startTime:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socket:WebsocketProvider,
    private afauth:AuthProvider) {
    this.startTime = (navParams.get("Date"))?navParams.get("Date"):new Date();
    //this.startTime = new Date();
    setInterval(this.counter.bind(this), 1000)
    afauth.getUser().subscribe((usr) =>{
      this.user = usr.email;
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

}
