import { Directive, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MapboxService } from '../../providers/mapbox.service';

@Directive({
	selector: 'mapbox-marker',
	inputs: ['coordinates']
})
export class MapBoxMarkerDirective implements OnInit {
		image: String = 'assets/imgs/icon-marker.png'; 
		width: number = 40;
		height: number = 40;
		coordinates: string[];
		@Output() click = new EventEmitter();

		constructor(public mapboxService: MapboxService) {}

		ngOnInit() {

			var el = document.createElement('div');

			el.className = 'marker';
			el.style.backgroundImage 	= 'url(' + this.image + ')';
			el.style.backgroundSize   	= 'cover';
			el.style.backgroundRepeat 	= 'no-repeat';
			el.style.width 				= this.width + 'px';	
			el.style.height 			= this.height + 'px';

			this.mapboxService.marker(
				el, // element
				{offset: [0, -this.height / 2]}, // options
				this.coordinates // coordinates
			);  

			el.addEventListener("click", () => {

				this.click.emit();
			});
		}
 }