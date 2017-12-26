import { Directive, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';

@Directive({
	selector: 'position-marker',
	inputs: ['position']
})
export class PositionMarkerDirective implements OnInit {
		position: {lat:number, long:number};  

		constructor(public mapboxService: MapboxService) {}

		ngOnInit() {
			this.mapboxService.updateMarkerPosition(this.position); 
		}
 }