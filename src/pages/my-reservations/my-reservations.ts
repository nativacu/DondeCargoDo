import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';

/**
 * Generated class for the MyReservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-reservations',
  templateUrl: 'my-reservations.html',
})
export class MyReservationsPage {


  reservations:Array<any>;
  pastReservations:Array<any>;
  activeReservations:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reservations = navParams.get('data');
    this.reservations.pop();
    this.reservations.reverse();
    console.log(this.reservations)
    //this.reservations.sort(this.compareReservations);
    let date:Date = new Date();
    let today:string = date.getFullYear() + "-" + ((date.getMonth()+1) > 10?'':'0') + (date.getMonth()+1) + "-" + (date.getDate() > 10?'':'0') + date.getDate();
    //console.log(today);
    let pos = this.findIndex(0, this.reservations.length - 1, today)
    if(this.reservations[pos].Fecha > today)
    {
      pos++;
    }
    console.log(pos);
    this.pastReservations = this.reservations.slice(pos, this.reservations.length);
    this.activeReservations = this.reservations.slice(0, pos);
    //console.log(this.reservations);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReservationsPage');
  }

  compareReservations(a:any, b:any):number{
    var returnValue:number
    if(a.Fecha == b.Fecha)
    {
      if(a.Hora_Inicio == b.Hora_Inicio)
        returnValue = 0;
      else
      {
        returnValue = (a.Hora_Inicio < b.Hora_Inicio)?1:-1;
      }
    }
    else
    {
      returnValue = (a.Fecha < b.Fecha)?1:-1;
    }
    return returnValue;
  }

  findIndex(l:number, r:number, date:string):number
  {
    var m:number = (r+l)/2;
    if(l == r)
      return l;
    if(this.reservations[m].Fecha > date)
    {
      return this.findIndex(m + 1, r, date);
    }
    else if(this.reservations[m].Fecha < date)
    {
      return this.findIndex(l, m - 1, date);
    }
    else
    {
      return m;
    }
  }

}
