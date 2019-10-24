import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform,  MenuController } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HttpRequestProvider } from '../../providers/http-request/http-request'
import { ReservationPage } from '../reservation/reservation';
import { AddPlugPage } from '../add-plug/add-plug';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html' 
})

export class MapPage {

  
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef; 

  data: any;
  currentCharger: any;
  showButton: boolean;
  adminButton: boolean;
  userId:any;
  //tipos de cargadores
  constructor(public navCtrl: NavController, 
    public maps: GoogleMapsProvider, 
    public http: HttpRequestProvider, 
    public platform: Platform, 
    public locations: LocationsProvider, 
    public menu: MenuController,
    public fauth:AuthProvider) {
      this.fauth.currUser.subscribe((usr)=> {
        if(usr)
          this.userId = usr.UserID;
      });
      this.adminButton = false;

  }

  

  ionViewDidLoad(){
   

    this.platform.ready().then(() => {
      //TODO change all this logic of stationrequest
      var chargers = this.http.makeStationRequest();
    
      this.maps.checkWorkingHours("hola");
      chargers.subscribe(data => {
        this.data = data;
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.navCtrl, this.data);

        //Waiting for charger to be pressed to transition to reserve charging station screen
        let chargerObserver = this.maps.chargerObserver;
      
        chargerObserver.subscribe(currentCharger => {
          if(currentCharger != null){
            this.currentCharger = currentCharger;
            this.adminButton = (this.userId == currentCharger.UserUserID)
            //Reducing map to show button
            var map = document.getElementById("map");
            var button = document.getElementById("reserveButton");
            var buttonadd = document.getElementById("addPlugButton");
            var buttonconf = document.getElementById("ConfigurePlugButton");
            map.style.height = (!this.adminButton?"93%":"77%");
            button.hidden = false;
            button.style.color = "white";
            console.log(currentCharger.type);
            if(this.adminButton)
            {
              buttonadd.hidden= false;
              buttonconf.hidden= false;
            }
            else
            {
              buttonadd.hidden= true;
              buttonconf.hidden= true;
            }
            if(!currentCharger.is_operational || currentCharger.type === "No afiliado"){
              button.setAttribute("disabled","disabled");
            }
            else{
              if(button.hasAttribute("disabled")){
                button.removeAttribute("disabled");
              }
            }
          }
        });

      }, (err) =>{ console.log(err); }); 
      
    });

  }

  toReserve(){
      this.navCtrl.push(ReservationPage, {
        charger: this.currentCharger
      });
  }
  addPlug(){
    this.navCtrl.push(AddPlugPage, {lugarid: this.currentCharger.LugarID});
  }
  configurePlug(){

  }

} 