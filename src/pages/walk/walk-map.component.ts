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
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  @Input()
  data; 
  // data

  markers: any;
  constructor() {
  }
  ngOnInit() {
    // this.markers = this.mapService.getMarkers()
    console.log('data passed through'); 
    console.log(this.data); 
    this.buildMap(); 
  }
  
  initializeMap() {
    
  }
  buildMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGllZGFubmVuYmVyZyIsImEiOiJjaXhmOTB6ZnowMDAwMnVzaDVkcnpsY2M1In0.33yDwUq670jHD8flKjzqxg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    }); 
  }

}
