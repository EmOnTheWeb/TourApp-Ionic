import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WalksService } from '../../providers/walks.service'; 


@Component({
  selector: 'page-waypoint',
  templateUrl: 'waypoint.html'
})
export class WaypointPage {
	  name:string; 
    info:string; 
    images:string[]; 
    imageTest:string = "http://api-walks.emiliedannenberg.co.uk/landmark_descriptions/images/queen_victoria_street_1.png"; 

  	constructor(public navCtrl: NavController, public navParams: NavParams ,private walksService: WalksService) {
        this.name = this.navParams.get("name");
        this.info = this.navParams.get("info"); 

        let imageFilename = this.name.toLowerCase().replace(/\s/g,'_').replace(/\'/g,''); 
        this.walksService.getWaypointImgPaths(imageFilename).then(paths => { 
            this.images = paths;
  
        });
  	}

  	ngOnInit(): void {

  	}
}
