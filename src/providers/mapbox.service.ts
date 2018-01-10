import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapboxService {
	  /// default settings
  	map: mapboxgl.Map;
  	style = 'mapbox://styles/mapbox/streets-v9'; 

    firstFlyTo = true; //keeps track of whether or not marker initialized and flown to
    currentMarker:mapboxgl.Marker; 
   
    constructor(private http: Http) { }

    buildMap(latLng:string[]) {
	    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGllZGFubmVuYmVyZyIsImEiOiJjaXhmOTB6ZnowMDAwMnVzaDVkcnpsY2M1In0.33yDwUq670jHD8flKjzqxg';
	    this.map = new mapboxgl.Map({
	        container: 'map',
	        style: this.style,
	        zoom: 15,
	        center: latLng
	    }); 
    }

    plotRoute(coordinates:Array<Array<string>>) {
    
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

 
    snapRouteToRoad(coordinatesString:string): Promise<any> {
       // console.log('coordinatesstring',coordinatesString); 
        const googleSnapToRoadEndpoint=`https://roads.googleapis.com/v1/snapToRoads?path=${coordinatesString}&interpolate=true&key=AIzaSyBS7JDohrrRFjkBMivYnlj8FlS8c5p0g04`; 
  
        return this.http.get(googleSnapToRoadEndpoint)
         .toPromise()
         .then(response => response.json())
         .catch(this.handleError);
    }


    marker(el: any, options: Object, coordinates: string[]) {
		setTimeout(() => {
			new mapboxgl.Marker(el, options)
				.setLngLat(coordinates)
				.addTo(this.map);
		}, 100);	

    }

    updateMarkerPosition(position) { //add marker to map 
        let long = position.long; 
        let lat = position.lat; 
        //delete old marker before readding for new position
        if(this.currentMarker) {
            this.currentMarker.remove(); 
        }

        this.currentMarker = new mapboxgl.Marker()
        .setLngLat([long,lat])
        .addTo(this.map);

        let mapBounds = this.map.getBounds(); 
        
        let NEBound = mapBounds._ne; 
        let SWBound = mapBounds._sw; 

        //if marker is outside bounds recenter map
        if((long > NEBound.lng || long < SWBound.lng || lat > NEBound.lat || lat < SWBound.lat) || this.firstFlyTo) {
          this.map.flyTo({
                center: [long, lat]
            });
            this.firstFlyTo = false; //want it to fly there first time round ... 
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}