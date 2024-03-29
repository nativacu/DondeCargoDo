import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { WebsocketProvider } from '../../providers/websocket/websocket';

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
  act:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpRequestProvider, public formBuilder:FormBuilder, public socket:WebsocketProvider) {
    this.serialForm = this.formBuilder.group({
      serial : ['', Validators.required]
    });
    this.lugarid = this.navParams.get('lugarid');
    this.socket.getMessages().subscribe((data:any) =>{
      if (data.Command === '') {
        if(this.act == 1)
          this.navCtrl.popToRoot();
        else
          this.serialForm.controls['serial'].setValue('');
      } else {
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlugPage');
  }
  upload(act)
  {
    this.act = act;
    this.socket.sendMessage(JSON.stringify({Command: 'CrearPlug', LugarLugarID: this.lugarid,PlugID:this.serialForm.controls['serial'].value}));
    this.navCtrl.popToRoot();
  }

}
