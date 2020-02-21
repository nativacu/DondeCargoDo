import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { MapPage } from '../map/map';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ChargersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chargers',
  templateUrl: 'chargers.html',
})
export class ChargersPage {
  user:any;
  chargers:Array<any> = [];
  serialForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public socket:WebsocketProvider, public fAuth:AuthProvider, public formBuilder:FormBuilder) {
    this.serialForm = this.formBuilder.group({
      serial : ['', Validators.required],
      capacity : ['', Validators.required]
    })
    fAuth.currUser.subscribe((user) =>{
      this.user = user;
    })
    this.socket.getMessages().subscribe((data) => {
      switch (data.Command) {
        case 'CargadorCreationSuccess':
          this.navCtrl.setRoot(MapPage);
          break;
        case 'CargadoresRetreived':
          this.chargers = data.Cargadores;
          break;
        default:
          break;
      }
    })
    this.socket.sendMessage(JSON.stringify({Command: 'GetCargadores', Email: this.user.Email}));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChargersPage');
  }

  addCharger()
  {
    this.socket.sendMessage(JSON.stringify({Command: 'CrearCargador', Email: this.user.Email, CargadorID: this.serialForm.controls['serial'].value, CapacidadMaxima: this.serialForm.controls['capacity'].value}))
  }

}
