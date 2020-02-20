import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargingMenuPage } from './charging-menu';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ChargingMenuPage,
  ],
    imports: [
        IonicPageModule.forChild(ChargingMenuPage),
        RoundProgressModule,
    ],
})
export class ChargingMenuPageModule {}
