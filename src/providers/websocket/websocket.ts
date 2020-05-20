import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { AuthProvider } from '../auth/auth';
/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

  static socket:WebSocket;
  static observable:Observable<any>;
  constructor(public http: HttpClient, public afs:AuthProvider) {
    console.log('Hello WebsocketProvider Provider');
    //this.startConnection("10.60.16.74");
  }

  startConnection(ipAddress:String){
    return new Promise<any>( (resolve, reject) =>{
      ipAddress = '190.113.73.11';
      if (WebsocketProvider.socket) {
        resolve();
      }

      else{
        WebsocketProvider.socket = new WebSocket('ws://' + ipAddress +':443/');
        //this.socket = new WebSocket('ws://190.113.73.11:443');

        WebsocketProvider.observable = new Observable(observer => {
          WebsocketProvider.socket.onmessage = function(data) {
            console.log(data);
            observer.next(JSON.parse(data.data));
          };
        });
        WebsocketProvider.socket.onopen = ((event) =>{
          resolve();
        });
        WebsocketProvider.socket.onerror = ((event) =>{
          reject("Connection Failed ");
        });
      }

  });
  }
  sendMessage(data) {
    WebsocketProvider.socket.send(data);
  }

  getMessages() {
    return WebsocketProvider.observable;
  }
  disconnect()
  {
    WebsocketProvider.socket.close();
  }

}
