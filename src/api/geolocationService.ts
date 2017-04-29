import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Component } from '@angular/core';



@Component({
    providers: [Http]
})

export class GeolocationService {
    static get parameters() {
            return [[Http]];
    }


    constructor(private http:Http) {


    }

    getCoords(val: string) {



        if(val && val.trim() != '') {
            val = val.trim();


            let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + val + "&key=AIzaSyAjMYy0pTk1DMBh44-c11xMACSEYHMmKHA";
            console.log(url);
            let response = this.http.get(url).map(res => res.json());
            //
             console.log("Response: " + response);

             console.log(response);

            return response;
        }
    }



}