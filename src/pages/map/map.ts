import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform,  MenuController } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HttpRequestProvider } from '../../providers/http-request/http-request'
import { ReservationPage } from '../reservation/reservation';



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
  //tipos de cargadores
  constructor(public navCtrl: NavController, 
    public maps: GoogleMapsProvider, 
    public http: HttpRequestProvider, 
    public platform: Platform, 
    public locations: LocationsProvider, 
    public menu: MenuController) {

  }

  

  ionViewDidLoad(){
   

    this.platform.ready().then(() => {
      
      var chargers = this.http.makeStationRequest();
    
      chargers.subscribe(data => {
        this.data = data;
        console.log(data);
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.navCtrl, this.data);

        //Waiting for charger to be pressed to transition to reserve charging station screen
        let chargerObserver = this.maps.chargerObserver;
      
        chargerObserver.subscribe(currentCharger => {
          if(currentCharger != null){
            this.currentCharger = currentCharger;

            //Reducing map to show button
            var map = document.getElementById("map");
            var button = document.getElementById("reserveButton");
            map.style.height = "93%";
            button.hidden = false;
            button.style.color = "white";
            console.log(currentCharger.type);
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

} 