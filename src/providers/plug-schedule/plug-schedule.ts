import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { BehaviorSubject } from 'rxjs';
import { DisplayPlug } from '../../models/display-plug';
import { DateTime } from 'ionic-angular';

/*
  Generated class for the PlugScheduleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlugScheduleProvider {
  plugSlots: BehaviorSubject<Array<Reserva>>;
  chosenCharger: BehaviorSubject<any>;

  constructor(public http: HttpClient) {
    this.plugSlots = new BehaviorSubject<Array<Reserva>>(null);
    this.chosenCharger = new BehaviorSubject<any>(null);
  }

  getDisplayPlugs(): Array<DisplayPlug> {
    let uniqueIds = new Set<string>();
    let displayPlugs = new Array<DisplayPlug>();
    if(this.plugSlots.value === null)
      return;

    this.plugSlots.value.forEach( reservation => {
      const id =  reservation.IOTPlugPlugID;

        if(!id) return;

        if(uniqueIds.has(id)) {
          displayPlugs.find(x => x.id == id).reservations.push(reservation);
        }
        else {
          displayPlugs.push(new DisplayPlug(id));
        }

        uniqueIds.add(reservation.IOTPlugPlugID);
      }
    );

    return displayPlugs;
  }

  getDisplayTimes(): Array<string> {
    if(this.chosenCharger.value == null) return;
    var timespans = new Array<string>();
    var startTime = this.chosenCharger.value.Hora_Inicio_Operaciones;
    var startTimeHour = +startTime.split(':')[0];
    var endTime = this.chosenCharger.value.Hora_Fin_Operaciones;
    var endTimeHour = +endTime.split(':')[0];

    for (let i = startTimeHour; i <= endTimeHour; i++) {
      console.log(i);
      let time: string;
      if(i > 12) {
        time = i - 12 + ':' + '00' + 'PM';
      }
      else {
        time = i + ':' + '00' + 'AM';
      }

      timespans.push(time);

      if(i > 12) {
        time = i - 12 + ':' + '30' + 'PM';
      }
      else {
        time = i + ':' + '30' + 'AM';
      }

      timespans.push(time);
    }

    return timespans;
  }
}
