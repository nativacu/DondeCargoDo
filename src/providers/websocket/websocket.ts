import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs'
import { AuthProvider } from '../auth/auth';
/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

  constructor(public http: HttpClient, public socket:Socket, public afs:AuthProvider) {
    console.log('Hello WebsocketProvider Provider');
  }

  connectToSocket()
  {
    this.socket.connect();
    this.afs.currUser.subscribe((usr) =>{
      if(usr)
        this.sendMessage(usr.UserID);
    })
  }
  sendMessage(response) {
    this.socket.emit('add', { data:response });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  disconnect()
  {
    this.socket.disconnect();
  }

}
