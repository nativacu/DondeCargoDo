import { Reserva } from './reserva';

 export class DisplayPlug {
  id: string | number;
  reservations: Array<Reserva>;

  constructor(id: string) {
    this.id = id;
    this.reservations = new Array<Reserva>();
  }
}
