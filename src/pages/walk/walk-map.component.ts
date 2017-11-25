import { Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'walk-map',
  templateUrl: 'walk-map.component.html',
})
export class WalkMap {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v9'; 
  latLng:[]; 

  @Input()
  data; 
  // data

  markers: any;
  constructor() {
  }
  ngOnInit() {
    // this.markers = this.mapService.getMarkers()
  
      this.latLng = this.data[0].beginning.split(','); 
      this.buildMap(); 
  }
  
  initializeMap() {
    
  }

  buildMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGllZGFubmVuYmVyZyIsImEiOiJjaXhmOTB6ZnowMDAwMnVzaDVkcnpsY2M1In0.33yDwUq670jHD8flKjzqxg';
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 15,
        center: this.latLng
      }); 
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
      this.plotRoute(routeCoordinates); 
  }

  plotRoute(coordinates:string[]) {
      this.map.on('load', () => {

          this.map.addLayer({
              "id": "route",
              "type": "line",
              "source": {
                  "type": "geojson",
                  "data": {
                      "type": "Feature",
                      "properties": {},
                      "geometry": {
                          "type": "LineString",
                          "coordinates": coordinates
                      }
                  }
              },
              "layout": {
                  "line-join": "round",
                  "line-cap": "round"
              },
              "paint": {
                  "line-color": "#d66",
                  "line-width": 4
              }
          });
      });
  }

}
