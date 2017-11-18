import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
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
	
	constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private walksService: WalksService) {
		
	}

	ngOnInit(): void {
		this.walk = this.navParams.get("walk");
		this.getDirections(this.walk); 
	}

	getDirections(walk:any) {

        this.storage.get(this.walk.name).then((directions) => {
            if(directions) {
                this.walkDirections = directions; 
            } 
            else { 
                //retrieve from the api 
                this.walksService.getDirections(walk.val)
                .then((directions) => {
                    this.walkDirections = directions; 
                 
                    this.storage.set(this.walk.name,directions).then(
                        (value) => console.log('directions stored'),
                        (error) => console.error('Error storing item', error)); 
                });  
            }
        });  
        this.getLandmarks(walk);  
    }

    getLandmarks(walk:any) {
        this.storage.get(this.walk.name + '-landmarks').then((landmarks) => {
            if(landmarks) {
                this.walkLandmarks = landmarks; 
            } 
            else {
            	this.walksService.getLandmarks(walk.val)
                .then((landmarks) => {
                    this.storage.set(this.walk.name + '-landmarks',landmarks).then(
                        (value) => console.log('landmarks stored'),
                        (error) => console.error('Error storing item', error)); 
                    this.walkLandmarks = landmarks; 
                });
            }
        }); 
    }

}