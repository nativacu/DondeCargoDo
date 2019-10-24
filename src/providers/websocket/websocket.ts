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

  constructor(public http: HttpClient, public afs:AuthProvider) {
    console.log('Hello WebsocketProvider Provider');
    this.socket = new WebSocket('ws://localhost:8080');
  }
  sendMessage(data) {
    this.socket.send(data);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.onmessage = function(data) {
        observer.next(data);
      };
    });
    return observable;
  }
  disconnect()
  {
    this.socket.close();
  }

}
