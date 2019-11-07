import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargingMenuPage } from './charging-menu';

@NgModule({
  declarations: [
    ChargingMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargingMenuPage),
  ],
})
export class ChargingMenuPageModule {}
