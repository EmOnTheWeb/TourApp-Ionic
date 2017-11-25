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

      for(let routeLeg of legs) {

          let legSteps = routeLeg.steps; 

          for(let step of legSteps) {

              let stepIntersections = step.intersections; 

              for(let intersection of stepIntersections) {

                   let intersectionCoordinate = intersection.location; 
                   routeCoordinates.push(intersectionCoordinate); 

              }
          }
      }
      this.plotRoute(routeCoordinates); 
  // for(var i=0;i<routeLegs.length;i++) {
    
  //   var legSteps = routeLegs[i].steps; 
  //   for(var index=0; index< legSteps.length; index++) {

  //     if(index === legSteps.length -1 && legSteps[index].type === 'arrive' && i !== routeLegs.length -1) { 
  //       waypointCoordinates.push(legSteps[index].location); 
  //     }
  //     var stepIntersections = legSteps[index].intersections; 
  //     for(var inter=0; inter< stepIntersections.length; inter++) {
  //       var intersectionCoordinate=stepIntersections[inter].location; 
  //       routeCoordinates.push(intersectionCoordinate); 
  //     }
  //   }
  // }
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
