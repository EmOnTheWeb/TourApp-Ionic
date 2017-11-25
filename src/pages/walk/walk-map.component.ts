import { Component, Input } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';

@Component({
  selector: 'walk-map',
  templateUrl: 'walk-map.component.html',
})
export class WalkMap {

  latLng:string[]; 

  @Input()
  data; 
  // data

  markers: any;
  constructor(public mapboxService: MapboxService) {
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
      console.log(this.latLng); 
      this.gatherRouteCoordinates(); 
  }

  gatherRouteCoordinates() {
      let legs = this.data[0].legs; 
      let routeCoordinates = []; 
      let waypointCoordinates = []; 
      console.log(waypointCoordinates); 
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
      this.mapboxService.plotRoute(routeCoordinates); 
  }
}
