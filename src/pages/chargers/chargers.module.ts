import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargersPage } from './chargers';

@NgModule({
  declarations: [
    ChargersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargersPage),
  ],
})
export class ChargersPageModule {}
