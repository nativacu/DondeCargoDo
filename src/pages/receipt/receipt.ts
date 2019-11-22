import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  monto:any;
  startTime:any;
  endTime:any;
  elapseTime:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var startTime:any;
    var endTime:any;
    var elapseTime:any;
    this.monto = (navParams.get("monto") != undefined)?navParams.get("monto"):0;
    startTime = (navParams.get("startTime") != undefined)?navParams.get("startTime"):new Date();
    endTime = (navParams.get("endTime") != undefined)?navParams.get("endTime"):new Date();
    elapseTime = new Date(endTime - startTime);

    this.startTime =  (startTime.getHours() < 10?'0':'') + startTime.getHours() + ':' +
                      (startTime.getMinutes() < 10?'0':'') + startTime.getMinutes();
    this.endTime =    (endTime.getHours() < 10?'0':'') + endTime.getHours() + ':' +
                      (endTime.getMinutes() < 10?'0':'')+ endTime.getMinutes();
    this.elapseTime = (elapseTime.getUTCHours() < 10?'0':'') + elapseTime.getUTCHours() + ':' +
                      (elapseTime.getUTCMinutes() < 10?'0':'') + elapseTime.getUTCMinutes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

}
