import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';

/**
 * Generated class for the TransactionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-list',
  templateUrl: 'transaction-list.html',
})
export class TransactionListPage {

  transactionList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public websocket:WebsocketProvider) {
    this.transactionList = this.navParams.get('data').Transactions;
  }

  ionViewDidLoad() {
  }

  getPlaceName(IOTPlugPlugID: string): string {
    return "Lugar";
  }
}
