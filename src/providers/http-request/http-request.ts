import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpRequestProvider {
  
  endpoint = 'http://192.168.43.141/';
  //endpoint = 'https://private-443a5-chargingstation.apiary-mock.com/';
  chargers : any;
  reservations: any;

  constructor(public http: HttpClient) {
    console.log('Hello HttpResponse Provider');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public makeStationRequest(): Observable<any> {
    return this.http.get(this.endpoint + 'pruebajsoncargador.php').map(this.extractData);
    //return this.http.get(this.endpoint + 'chargers').map(this.extractData);
  }

  public getStations(){
    this.makeStationRequest().subscribe(data => {
      console.log(data);
      this.chargers = data.next();
      console.log(this.chargers);
      return data;
    }, () => { console.log(this.chargers);
    }); 
  }

  public makeReservationRequest(): Observable<any> {
    return this.http.get(this.endpoint).map(this.extractData);
   // return this.http.get(this.endpoint + 'reservations').map(this.extractData);
  }

  public getReservations(){
    this.makeReservationRequest().subscribe(data => {
      console.log(data);
      this.reservations = data;
      console.log(this.reservations);
      return data;
    }, () => { console.log(this.reservations);
    }); 
  }


  public sendPostRequest(postData) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    this.http.post(this.endpoint + '/reservations', headers, postData)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }
}


