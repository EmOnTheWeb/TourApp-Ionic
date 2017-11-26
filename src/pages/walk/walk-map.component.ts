import { Component, Input } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';
import { NavController } from 'ionic-angular';
import { WaypointPage } from './waypoint'; 

@Component({
  selector: 'walk-map',
  templateUrl: 'walk-map.component.html',
})
export class WalkMap {

  latLng:string[]; 

  @Input()
  data; 
  // data

  waypoints: Array<Array<string>>; 
  constructor(public navCtrl: NavController,public mapboxService: MapboxService) {
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

      this.navCtrl.push(WaypointPage, {name,info});
  }
}
