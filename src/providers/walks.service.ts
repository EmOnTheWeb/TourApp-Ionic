import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import { Walk } from '../walk';

@Injectable()
export class WalksService {
    private walksUrl = `http:\/\/api-walks.emiliedannenberg.co.uk/list-walks`;  // URL to web api
    constructor(private http: Http) { }

    getWalks(): Promise<Walk[]> {
        return this.http.get(this.walksUrl)
             .toPromise()
             .then(walks => walks.json() as Walk[]); 
    }
}