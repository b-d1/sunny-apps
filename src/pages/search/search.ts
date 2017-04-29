import {HttpModule, Http} from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Item } from '../search/Item';
import { GeolocationService } from '../../api/geolocationService';
import { InfoService } from '../../api/infoService';



@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ GeolocationService, InfoService, HttpModule]
})




export class Search {




  searchQuery: string = '';
  items: Item[];
  show: boolean;
  itemTmp: Item;
  itemSearch: string;
  itemList: boolean;

  constructor(public navCtrl: NavController, public lService: GeolocationService, public iService: InfoService) {
      this.initializeItems();
      this.show = false;
      this.itemTmp = null;
      this.itemList = true;
  }

  initializeItems() {
      this.itemList = true;
    this.items = [new Item('Santa Monica State Beach', 'url', true, 'pin'), new Item('Manhattan Beach', 'url', true, 'pin'), new Item('Marina Beach', 'url', true, 'pin'), new Item('El Matador State Beach', 'url', true, 'pin')];
  }

  getItems(query: any) {
      this.initializeItems();

      // set val to the value of the searchbar
      let val = query.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
              item.hidden = false;
              return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      }
  }

    round(value: number, precision: number) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


  setItem(item: Item) {
      this.lService.getCoords(item.name).subscribe(
          data => {
              console.log("Data: " + data);

              let lng = data.results[0].geometry.location.lng;
              let lat = data.results[0].geometry.location.lat;
              console.log("Lat: " + lat);
              console.log("Lng: " + lng);
              lat = this.round(lat, 1);
              lng = this.round(lng, 1);
              console.log("Lat1: " + lat);
              console.log("Lng1: " + lng);

              // this.iService.getInfo(lat, lng).subscribe(
              //     data =>
              //     {
              //         console.log("d" + data);
              //         console.log("Info data: " + data);
              //     },
              //     err => {
              //         console.log("dafsdfsad");
              //         console.log(err);
              //     },
              //     () => console.log('Information Search Complete')
              //
              // );

          },
          err => {
              console.log("Error location");
              console.log(err);
          },
          () => console.log('Location Search Complete'));

      // console.log(response);
      this.itemTmp = item;
      this.show = true;
      this.itemSearch = null;
      this.itemList = false;
  }



}
