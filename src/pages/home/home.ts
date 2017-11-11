import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Walk } from '../../walk';
import { WalksService } from '../../providers/walks.service'; 


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
      .then((walkInfo) => {
      	// 	this.walks = [{
      	// 		// id:1,  
			    // name:'Kentish Town' 
			    // // image_url:'../../assets/imgs/kentish-town.png',
			    // // description:'A walk around Kentish Town'
      	// 	}]	
      		for(let walk of walkInfo) {
              
              let rmvExt = walk.split('.')[0]; 
              let optVal = rmvExt;  
              let optName = rmvExt.replace(/_/g,' '); 
              this.walks.push({name:optName, val:optVal});
          }
   		});
  	}

    getDirections(walk:any) {
        this.walksService.getDirections(walk.val)
        .then((directions) => {

            console.log(directions); 

        }); 


    }
}
