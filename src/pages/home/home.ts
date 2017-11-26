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

  	constructor(public navCtrl: NavController,private walksService: WalksService) {

  	}

  	ngOnInit(): void {
       this.walksService.getWalks()
      .then((walksInfo) => {
      	// 	this.walks = [{
      	// 		// id:1,  
			    // name:'Kentish Town' 
			    // // image_url:'../../assets/imgs/kentish-town.png',
			    // // description:'A walk around Kentish Town'
      	// 	}]	
      		for(let walk of walksInfo) {
              
              let rmvExt = walk.split('.')[0]; 
              let optVal = rmvExt;  
              let optName = rmvExt.replace(/_/g,' '); 
              this.walks.push({name:optName, val:optVal});
          }
   		});
  	}
    goToWalk(walk:any) {
        this.navCtrl.push(WalkPage, {walk});
    }
}
