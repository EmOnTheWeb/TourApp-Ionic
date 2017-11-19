import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class WalkMap {
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';
  // data

  markers: any;
  constructor() {
  }
  ngOnInit() {
    // this.markers = this.mapService.getMarkers()
    this.initializeMap()
  }
  
  initializeMap() {
    
  }
  buildMap() {
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: this.style,
    //   zoom: 13,
    //   center: [this.lng, this.lat]
    });
