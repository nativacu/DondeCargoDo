import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

/**
 * Generated class for the RegisterPlugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-plug',
  templateUrl: 'register-plug.html',
})
export class RegisterPlugPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  placeLocation: any;
  daysArray:Array<String> = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  dateInit:any
  dateEnd:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.placeLocation = this.navParams.get('location');
    
    console.log(this.placeLocation.lng());

  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad RegisterPlugPage');
  }

  setPicker(){
    
  }

  uploadData(){
    let startDate = (this.dateInit < this.dateEnd? this.dateInit:this.dateEnd);
    let endDate = (this.dateInit > this.dateEnd? this.dateInit:this.dateEnd);
    /*to upload the date would be:
      daysArray[+startDate] and daysArray[+endDate]
    */
  }

}
