import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { MapPage } from '../map/map';

/**
 * Generated class for the AddPlugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-plug',
  templateUrl: 'add-plug.html',
})
export class AddPlugPage {
  serialForm:FormGroup;
  lugarid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpRequestProvider, public formBuilder:FormBuilder) {
    this.serialForm = this.formBuilder.group({
      serial : ['', Validators.required]
    })
    this.lugarid = this.navParams.get('lugarid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlugPage');
  }
  upload(act)
  {
    this.http.sendPostRequest({LugarLugarID: this.lugarid,PlugID:this.serialForm.controls['serial'].value}, 'crearPlug.php').then((data) =>{
      console.log(data);
      if(act == 1)
      {
        this.navCtrl.setRoot(MapPage);
      }
      else
      {
        this.serialForm.controls['serial'].setValue('');
      }
    }, (err) =>{
      console.log(err);
    })
  }

}
