import { Reserva } from './reserva';

 export class DisplayPlug {
  id: string | number;
  reservations: Array<Reserva>;
  reservedHours:Array<String>;
  constructor(id: string) {
    this.id = id;
    this.reservations = new Array<Reserva>();
    this.reservedHours = new Array<String>();
  }
}
