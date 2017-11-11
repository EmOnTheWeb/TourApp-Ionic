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
             .then(walks => walks.json() as Walk[]); 
    }

    getDirections(walkVal:any): Promise<Any> {
    	
    	let url = this.walksUrl + 'get_directions' + '/' + walkVal; 
    	debugger
        return this.http.get(url)
             .toPromise()
             .then(directions => directions.json() as []); 
    }
}