import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Component } from '@angular/core';



@Component({
    providers: [Http]
})

export class InfoService {
    static get parameters() {
        return [[Http]];
    }


    constructor(private http:Http) {


    }

    getInfo(lat: number, lng: number) {
            console.log("hello");

            let url = "http://localhost:8000/getdata?lat=" + lat + "&lng=" + lng;

            console.log(url);

            let response = this.http.get(url).map(res => res.json());
            return response;

    }



}