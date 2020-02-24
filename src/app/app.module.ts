import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { LocationsApp } from './app.component';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { ReservationPage } from '../pages/reservation/reservation';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { RegisterPlugPage } from '../pages/register-plug/register-plug';
import { PlacePlugPage } from '../pages/place-plug/place-plug';
import { AddPlugPage } from '../pages/add-plug/add-plug';
import { PlatformProvider } from '../providers/platform/platform';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { Push } from '@ionic-native/push';
import { ChargeConfirmationPage } from '../pages/charge-confirmation/charge-confirmation';
import { OneSignal } from '@ionic-native/onesignal';
import { firebase } from '../config'
import { ChargingMenuPage } from '../pages/charging-menu/charging-menu';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ReceiptPage } from '../pages/receipt/receipt';
import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { ChargersPage } from '../pages/chargers/chargers';

@NgModule({
  declarations: [
    LocationsApp,
    MapPage,
    LoginPage,
    ReservationPage,
    RegisterPlugPage,
    PlacePlugPage,
    AddPlugPage,
    ChargeConfirmationPage,
    ChargingMenuPage,
    ReceiptPage,
    TransactionListPage,
    ChargersPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    IonicModule.forRoot(LocationsApp),
    IonicStorageModule.forRoot(),
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LocationsApp,
    MapPage,
    LoginPage,
    ReservationPage,
    PlacePlugPage,
    RegisterPlugPage,
    AddPlugPage,
    ChargeConfirmationPage,
    ChargingMenuPage,
    ReceiptPage,
    TransactionListPage,
    ChargersPage
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
    FirebaseProvider,
    PlatformProvider,
    WebsocketProvider,
    Push,
    OneSignal,
  ]
})
export class AppModule {}
