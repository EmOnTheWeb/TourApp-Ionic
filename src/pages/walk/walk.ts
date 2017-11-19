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
		this.storage.clear(); 
	}

	ngOnInit(): void {
		this.walk = this.navParams.get("walk");
        Promise.all([this.getDirections(this.walk), this.getLandmarks(this.walk)]).then(walkData => { 

        });
		
	}

	getDirections(walk:any) {
        return new Promise((resolve, reject) => {

            this.storage.get(this.walk.name).then((directions) => {
                if(directions) {
                    this.walkDirections = directions;

                    resolve(this.walkDirections);  
                } 
                else { 
                    //retrieve from the api 
                    this.walksService.getDirections(walk.val)
                    .then((directions) => {

                        this.walkDirections = this.parseDirections(directions); 
                        
                        resolve(this.walkDirections); 

                        this.storage.set(this.walk.name,this.walkDirections).then(
                            (value) => console.log('directions stored'),
                            (error) => console.error('Error storing item', error)); 
                    });  
                }
            }); 
        });   
    }

    parseDirections(directions) {

        let turnByTurn = directions['turn-by-turn']; 
        turnByTurn = JSON.parse(turnByTurn); 
        let waypointsOnly = directions['waypoint-coordinates'];  
           
        let route = turnByTurn.routes[0]; 
        let legs = route.legs; //a leg is a route between two waypoints     

        //walk start and end coordinates
        let startCoordinate = turnByTurn.waypoints[0].location.join(); 
        let endCoordinate = turnByTurn.waypoints[turnByTurn.waypoints.length-1].location.join(); 

        for(let leg of legs) {
            //remove properties you don't need 
            delete leg.distance; 
            delete leg.duration; 
            delete leg.summary; 
            delete leg.weight; 
            //steps keep maneuver, location, type 
            for(let step of leg.steps) {
                     
                delete step.distance; 
                delete step.duration; 
                // legs[i].steps[index].bearing = legs[i].steps[index].geometry;    
                delete step.geometry; 
                // delete legs[i].steps[index].intersections; 
                delete step.mode; 
                delete step.name; 
                delete step.weight;  
                step.instruction = step.maneuver.instruction; 
                step.location = step.maneuver.location; 
                step.type = step.maneuver.type;

                delete step.maneuver; 
                
            }
        }
        return { beginning: startCoordinate, end: endCoordinate, legs: legs, waypoints:waypointsOnly }; 
    }

    getLandmarks(walk:any) {
        return new Promise((resolve, reject) => {
            this.storage.get(this.walk.name + '-landmarks').then((landmarks) => {
                if(landmarks) {
                    this.walkLandmarks = landmarks; 
                    resolve(this.walkLandmarks); 
                } 
                else {
                	this.walksService.getLandmarks(walk.val)
                    .then((landmarks) => {
                        this.walkLandmarks = landmarks; 
                        resolve(this.walkLandmarks); 

                        this.storage.set(this.walk.name + '-landmarks',landmarks).then(
                            (value) => console.log('landmarks stored'),
                            (error) => console.error('Error storing item', error)); 
                       
                    });
                }
            }); 
        }); 
    }

}