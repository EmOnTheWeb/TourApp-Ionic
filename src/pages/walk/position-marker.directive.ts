import { Directive, Input, OnChanges, Inject, Output, EventEmitter } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';

@Directive({
	selector: 'position-marker',
	inputs: ['position']
})
export class PositionMarkerDirective implements OnChanges {
		position: {lat:number, long:number};  

		constructor(public mapboxService: MapboxService) {}

		ngOnChanges() {
			this.mapboxService.updateMarkerPosition(this.position); 
		}
 }