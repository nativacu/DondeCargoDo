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
  startTime:Date;
  endTime:Date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.monto = navParams.get("monto")?navParams.get("monto"):0;
    this.startTime = navParams.get("startTime")?navParams.get("startTime"):new Date();
    this.endTime = navParams.get("endTime")?navParams.get("endTime"):new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

}
