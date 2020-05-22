import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DisplayPlug } from './DisplayPlug';
import { PlugScheduleProvider } from '../../providers/plug-schedule/plug-schedule';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { Reserva } from '../../models/reserva';
import { AuthProvider } from '../../providers/auth/auth';
import { DisplayPlug } from '../../models/display-plug';
/**
 * Generated class for the ReservationSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation-schedule',
  templateUrl: 'reservation-schedule.html',
})
export class ReservationSchedulePage {

  openTab: Array<boolean>;
  displayPlugs: Array<DisplayPlug>;
  displaySchedules: Array<string>;
  chosenCharger: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private plugScheduleProvider: PlugScheduleProvider,
              private websocketProvider: WebsocketProvider) {

    this.plugScheduleProvider.plugSlots.subscribe((slots) => {
      this.displayPlugs = this.plugScheduleProvider.getDisplayPlugs();
      this.openTab = slots ? new Array<boolean>(this.displayPlugs.length) : null;
    });

    this.plugScheduleProvider.chosenCharger.subscribe((charger) => {
      this.chosenCharger = charger;
      this.displaySchedules = this.plugScheduleProvider.getDisplayTimes();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationSchedulePage');


  }

  toggleTab(index: number) {
    const i = this.openTab.findIndex(x => x == true);

    if(i != index) this.openTab[i] = false;
    this.openTab[index] = !this.openTab[index];
  }
}
