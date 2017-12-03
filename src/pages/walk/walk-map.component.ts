import { Component, Input } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WaypointPage } from './waypoint'; 

@Component({
  selector: 'walk-map',
  templateUrl: 'walk-map.component.html',
})
export class WalkMap {

  latLng:string[]; 
  watchId:any; //id to cancel watch position subscription 
  waypointsReached = {  //object to track whether you've already hit a waypoint
    start: false, 
    end: false,
    waypoint: [],
    steps: []
  }

  @Input()
  data; 
  @Input()
  walkDir; 
  // data

  waypoints: Array<Array<string>>; 
  constructor(public navCtrl: NavController,public mapboxService: MapboxService, public geolocation: Geolocation) {
  }
  ngOnInit() {
    // this.markers = this.mapService.getMarkers()
  
      this.latLng = this.data[0].beginning.split(','); 
      this.buildMap(); 
  }
  
  initializeMap() {
    
  }

  buildMap() {
      this.mapboxService.buildMap(this.latLng); 
      this.gatherRouteCoordinates(); 
      this.startTracking(); 
  }

  startTracking() {
     this.watchId = this.geolocation.watchPosition()
         .subscribe(position => {

             let currentLng = position.coords.longitude;
             let currentLat = position.coords.latitude;
             // updateMarkerPosition(currentLng,currentLat, map);
             //loop through all steps to see if you're at a significant location
             let coordinateData = this.data[0];
          
             let journeyLegs = coordinateData.legs;

             for (let i = 0; i < journeyLegs.length; i++) {

                 let currentLeg = journeyLegs[i];
                 let legSteps = currentLeg.steps;

                 for (let j = 0; j < legSteps.length; j++) {

                     let currentStep = legSteps[j];
                     let stepLocation = currentStep.location;
  
                     let stepLat;
                     let stepLng;

                     stepLat = stepLocation[1];
                     stepLng = stepLocation[0];
                
                     if (this.isClose(currentLat, currentLng, stepLat, stepLng) && (currentStep.type === "arrive" || this.atBeginning(stepLat, stepLng, coordinateData.beginning))) {    
                          //if step type is arrive you're at a waypoint, get waypoint info  
                         if (currentStep.type === "arrive" && !this.atEnd(stepLat, stepLng, coordinateData.end) && this.waypointsReached.waypoint.indexOf(i) === -1) {
                             //get waypoint info. 
                             console.log('you are at a waypoint');
                             //get leg, get corresponding waypoint info index
                             // let waypointDescription = getWaypointDescription(i, walkData.landmarkDescriptions);
                             // buildWaypointPage(waypointDescription);

                             // this.waypointsReached.waypoint.push(i);
                             // playAudio(i, walkData.walkDirections);
                             // navigator.vibrate(2000);   
                         } else if (currentStep.type === "arrive" && this.atEnd(stepLat, stepLng, coordinateData.end) && !this.waypointsReached.end) { // you're at the end

                             console.log('at end'); 

                             this.waypointsReached.end = true;
                             this.waypointsReached.steps.push(i + j);

                         } else if (this.atBeginning(stepLat, stepLng, coordinateData.beginning) && !this.waypointsReached.start) { //at beginning
                              
                            console.log('at beginning'); 

                            this.waypointsReached.start = true;
                            this.waypointsReached.steps.push(i + j);
                         }
                         //now break out of everything
                         j = legSteps.length;
                         i = journeyLegs.length;
                         
                     } else {
                         //not close to a waypoint  
                     }
                 }
             }
        });
  } 

  isClose(currentLat, currentLng, stepLat, stepLng) { 
      //in future probably want to calculate based on trajectory as well. So only counts as close if you are approaching from the right direction... 
      if(Math.abs(currentLat - stepLat) <= 0.0003 && Math.abs(currentLng - stepLng) <= 0.0003) {    
          return true; 
      }
      return false; 
  } 

  atBeginning(stepLat, stepLng, walkStartCoordinatesString) {
  
      let walkStartCoordinates = walkStartCoordinatesString.split(','); 
      let walkStartLat = walkStartCoordinates[1]; 
      let walkStartLng = walkStartCoordinates[0]; 

      return (Math.abs(walkStartLat - stepLat) <= 0.0003 && Math.abs(walkStartLng - stepLng) <= 0.0003) ? true: false; 
  } 

  atEnd(stepLat, stepLng, walkEndCoordinatesString) {
    
      let walkEndCoordinates = walkEndCoordinatesString.split(','); 
      let walkEndLat = walkEndCoordinates[1]; 
      let walkEndLng = walkEndCoordinates[0]; 

      return (Math.abs(walkEndLat - stepLat) <= 0.0003 && Math.abs(walkEndLng - stepLng) <= 0.0003) ? true: false;  
  }  

  gatherRouteCoordinates() {
      let legs = this.data[0].legs; 
      let routeCoordinates = []; 
      let waypointCoordinates = []; 
      
      legs.forEach(function(leg, legIndex) {
          
          let legSteps = leg.steps; 

          legSteps.forEach(function(step, stepIndex) {

              if(stepIndex === legSteps.length-1 && step.type === 'arrive' && legIndex !== legs.length-1){
                  waypointCoordinates.push(step.location);
              }

              let stepIntersections = step.intersections;

              stepIntersections.forEach(function(intersection,intersectionIndex) {

                  let intersectionCoordinate = intersection.location; 
                  routeCoordinates.push(intersectionCoordinate); 
              }) ; 
          }); 
      });

      this.waypoints = waypointCoordinates; 
      this.mapboxService.plotRoute(routeCoordinates); 
  }

  showWaypointInfo(waypoint:string[]) {
      let index = this.waypoints.indexOf(waypoint); 
      let landmarkInfo = this.data[1]; 
      
      let nameInfo = landmarkInfo.split(',')[index].trim(); 
      let name = nameInfo.split(':')[0].trim(); 
      let info = nameInfo.split(':')[1].trim(); 
      
      let walkDir = this.walkDir;  //pass through directory and index to get audio file
      let waypointNum = index + 1; 

      this.navCtrl.push(WaypointPage, {name,info, walkDir, waypointNum});
  }
}
