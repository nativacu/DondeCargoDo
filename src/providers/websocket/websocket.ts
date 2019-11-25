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

  socket:WebSocket;
  observable:Observable<any>;
  constructor(public http: HttpClient, public afs:AuthProvider) {
    console.log('Hello WebsocketProvider Provider');
    this.socket = new WebSocket('ws://192.168.43.2:8080');//10.60.16.165 server ip
    this.observable = new Observable(observer => {
      this.socket.onmessage = function(data) {
        console.log(data)
        observer.next(JSON.parse(data.data));
      };
    });
  }
  sendMessage(data) {
    this.socket.send(data);
  }

  getMessages() {
    return this.observable;
  }
  disconnect()
  {
    this.socket.close();
  }

}
