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
    if(this.plugSlots.value.length > 0 && this.plugSlots.value[this.plugSlots.value.length - 1].IOTPlugPlugID == undefined)
    {
      this.plugSlots.value.pop();
    }
    this.plugSlots.value.forEach( reservation => {
      const id =  reservation.IOTPlugPlugID.toString();

        if(!id) return;

        if(uniqueIds.has(id)) {
          let startTimeHour = +reservation.Hora_Inicio.split(':')[0];
          let endTimeHour = +reservation.Hora_Fin.split(':')[0];
          if(+reservation.Hora_Inicio.split(':')[1] == 30)
          {
            if(startTimeHour > 12) {
              displayPlugs.find(x => x.id == id).reservedHours.push(startTimeHour - 12 + ':' + '30' + 'PM');
            }
            else {
              displayPlugs.find(x => x.id == id).reservedHours.push(startTimeHour + ':' + '30' + 'AM');
            }
            startTimeHour++;
          }
          for(let i = startTimeHour; i <= endTimeHour; i++)
          {
            if(i > 12) {
              displayPlugs.find(x => x.id == id).reservedHours.push(i - 12 + ':' + '00' + 'PM');
            }
            else {
              displayPlugs.find(x => x.id == id).reservedHours.push(i + ':' + '00' + 'AM');
            }

            if(i == endTimeHour && reservation.Hora_Fin.split(':')[1] == '20')
              break;

            if(i > 12) {
              displayPlugs.find(x => x.id == id).reservedHours.push(i - 12 + ':' + '30' + 'PM');
            }
            else {
              displayPlugs.find(x => x.id == id).reservedHours.push(i + ':' + '30' + 'AM');
            }
          }
        }
        else {
          displayPlugs.push(new DisplayPlug(id));
        }

        uniqueIds.add(reservation.IOTPlugPlugID.toString());
      }
    );
    console.log(displayPlugs);
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
