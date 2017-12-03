import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import { Walk } from '../walk';

@Injectable()
export class WalksService {
    private walksUrl = `http:\/\/api-walks.emiliedannenberg.co.uk/`;  // URL to web api
    constructor(private http: Http) { }

    getWalks(): Promise<Walk[]> {
    	let url = this.walksUrl + 'list-walks'; 
        return this.http.get(url)
             .toPromise()
             .then(walks => walks.json() as Walk[])
             .catch(this.handleError); 
    }

    getDirections(walkVal:any): Promise<any> {
    	
    	let url = this.walksUrl + 'get-directions' + '/' + walkVal; 
        return this.http.get(url)
             .toPromise()
             .then(directions => directions.json())
             .catch(this.handleError); 
    }

    getLandmarks(walkVal:any): Promise<any> {

    	let url = this.walksUrl + 'get-landmarks' + '/' + walkVal;
        return this.http.get(url)
             .toPromise()
             .then(landmarks => landmarks.json())
             .catch(this.handleError);
    }

    getWaypointImgPaths(imgFilename:string): Promise<any> {

        let url = this.walksUrl + 'get-waypoint-images' + '/' + imgFilename;
        return this.http.get(url)
             .toPromise()
             .then(paths => {
                let pathArray = paths.json(); 
                return pathArray = pathArray.map((v,i) => this.walksUrl + v.substr(2,v.length-1)); 
            })
             .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    } 
}