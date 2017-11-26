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

  	constructor(public navCtrl: NavController, public navParams: NavParams ,private walksService: WalksService) {
        this.name = this.navParams.get("name");
        this.info = this.navParams.get("info"); 
  	}

  	ngOnInit(): void {
  	}
 
}
