import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WalksService } from '../../providers/walks.service'; 

@Component({
  selector: 'page-walk',
  templateUrl: 'walk.html'
})
export class WalkPage {
	walk; 
	walkDirections; 
	walkLandmarks; 
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private walksService: WalksService) {
		
	}

	ngOnInit(): void {
		this.walk = this.navParams.get("walk");
		console.log(this.walk); 
		this.getDirections(this.walk); 

	}

	getDirections(walk:any) {
        this.walksService.getDirections(walk.val)
        .then((directions) => {
            this.walkDirections = directions; 
            this.getLandmarks(walk); 
        }); 
    }
    getLandmarks(walk:any) {
    	this.walksService.getLandmarks(walk.val)  
    	.then((landmarks) => {
            this.walkLandmarks = landmarks; 
            console.log(landmarks);  
        });

    }

}