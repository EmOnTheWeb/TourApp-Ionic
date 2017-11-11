import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Walk } from '../../walk';
import { WalksService } from '../../providers/walks.service'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	walks: Walk[] = []; 
  	
  	constructor(public navCtrl: NavController,private walksService: WalksService) {

  	}

  	ngOnInit(): void {
       this.walksService.getWalks()
      .then((walkInfo) => {
      	// 	this.walks = [{
      	// 		// id:1,  
			    // name:'Kentish Town' 
			    // // image_url:'../../assets/imgs/kentish-town.png',
			    // // description:'A walk around Kentish Town'
      	// 	}]	
      		this.walks = walkInfo;
      		this.walks = [{name:'Kentish Town'}];
      		console.log(this.walks); 
   		});
  	}
}
