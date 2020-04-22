import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { RegisterPlugPage } from '../register-plug/register-plug';

/**
 * Generated class for the PlacePlugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-plug',
  templateUrl: 'place-plug.html',
})

export class PlacePlugPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  user:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMapsProvider) {
    this.user = this.navParams.get('email');
  }

  ionViewDidLoad() {
    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.navCtrl, []);
    console.log(this.maps.getMapCenter());
    console.log('ionViewDidLoad PlacePlugPage');
  }

  toRegisterPlug(){
    var center = this.maps.map.center;
    //this.maps.addMarker(center);
    this.navCtrl.push(RegisterPlugPage, {location: center, email: this.user});
  }
}
