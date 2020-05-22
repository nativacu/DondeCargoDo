import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationSchedulePage } from './reservation-schedule';

@NgModule({
  declarations: [
    ReservationSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationSchedulePage),
  ],
})
export class ReservationSchedulePageModule {}
