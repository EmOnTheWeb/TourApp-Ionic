import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapboxService {
	  /// default settings
  	map: mapboxgl.Map;
  	style = 'mapbox://styles/mapbox/streets-v9'; 
   
    constructor() { }

    buildMap(latLng:string[]) {
	    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGllZGFubmVuYmVyZyIsImEiOiJjaXhmOTB6ZnowMDAwMnVzaDVkcnpsY2M1In0.33yDwUq670jHD8flKjzqxg';
	    this.map = new mapboxgl.Map({
	        container: 'map',
	        style: this.style,
	        zoom: 15,
	        center: latLng
	    }); 
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

    marker(el: any, options: Object, coordinates: string[]) {
		setTimeout(() => {
			new mapboxgl.Marker(el, options)
				.setLngLat(coordinates)
				.addTo(this.map);
		}, 100);	

    }
}