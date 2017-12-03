import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WalksService } from '../../providers/walks.service'; 
import { WalkPage } from '../walk/walk'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	  walks = []; 
    serverUrl = "http://localhost:8888"; 

  	constructor(public navCtrl: NavController,private walksService: WalksService) {

  	}

  	ngOnInit(): void {
       this.walksService.getWalks()
      .then((walksInfo) => {
   
      		for(let walk of walksInfo) {
    
              let name = walk.name.trim(); 
              let val = name.replace(/ /g,'_'); 

              let {image_url, description} = walk; 

              this.walks.push({name, val, image_url, description});
          }
   		});
  	}
    goToWalk(walk:any) {
        this.navCtrl.push(WalkPage, {walk});
    }
}
