import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from 'ionic-native';
import { LocationsApp } from './app.component';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { MapPage } from '../pages/map/map';
import {LoginPage} from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestProvider } from '../providers/http-request/http-request'; 
import { ReservationPage } from '../pages/reservation/reservation';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { RegisterPlugPage } from '../pages/register-plug/register-plug';
const firebase = {
  apiKey: "AIzaSyB691bJp_LEwx37FIOXfcjEMrUEEwkbXuY",
  authDomain: "friendlychat-b018e.firebaseapp.com",
  databaseURL: "https://friendlychat-b018e.firebaseio.com",
  projectId: "friendlychat-b018e",
  storageBucket: "friendlychat-b018e.appspot.com",
  messagingSenderId: "1032475507428",
}

@NgModule({
  declarations: [
    LocationsApp,
    MapPage,
    LoginPage,
    ReservationPage,
    RegisterPlugPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    IonicModule.forRoot(LocationsApp),
    IonicStorageModule.forRoot() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LocationsApp,
    MapPage,
    LoginPage,
    ReservationPage,
    RegisterPlugPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityProvider,
    SplashScreen,
    StatusBar,
    GoogleMapsProvider,
    LocationsProvider,
    HttpRequestProvider,
    Camera,
    AngularFireDatabase,
    AuthProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
