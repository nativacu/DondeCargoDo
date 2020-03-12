import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargeConfirmationPage } from './charge-confirmation';

@NgModule({
  declarations: [
    ChargeConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargeConfirmationPage),
  ],
})
export class ChargeConfirmationPageModule {}
