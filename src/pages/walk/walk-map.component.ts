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
  }

}
