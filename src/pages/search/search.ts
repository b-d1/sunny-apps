import {HttpModule, Http} from '@angular/http';
import { Component } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { Item } from '../search/Item';
import { GeolocationService } from '../../api/geolocationService';
import { InfoService } from '../../api/infoService';




@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ GeolocationService, HttpModule, InfoService]
})




export class Search {




    loading: any;

  searchQuery: string = '';
  items: Item[];
  show: boolean;
  itemTmp: Item;
  itemSearch: string;
  itemList: boolean;
    options: Object;

  constructor(public navCtrl: NavController, public lService: GeolocationService, public iService: InfoService, public load: LoadingController) {

      this.loading = this.load.create({
          content: 'Reading data...'
      });

      this.initializeItems();
      this.show = false;
      this.itemList = true;
      this.itemTmp = new Item('d', 'd', true, 'd');
      this.options = {
          chart : {
              width: 300,
              height: 400,
              marginTop: 50
          },
          title : { text : '' },
          series: [{
              data: [[12, 1.7], [13, 1.9], [14, 2.1], [15, 2.2], [16, 2.1], [17, 2.1], [18, 1.9]],
              name: 'UV Radiation'
          },
              {
                  data: [[12, 1], [13, 1.3], [14, 1.4], [15, 1.3], [16, 1.3], [17, 1.3], [18, 1.3]],
                  name: 'HAB Concentration'
              },
              {
                  data: [[12, 2.4], [13, 3.9], [14, 4.6], [15, 3.8], [16, 4.7], [17, 1.5], [18, 1.7]],
                  name: 'Clouds'
              }],
          yAxis: {
              labels: {
                  align: 'left',
                  x: 0,
                  y: -5
              },
              title: {
                  text: 'Indexes'
              },
              min: 1,
              max: 7,
              tickInterval: 1
          },
          xAxis: {
              labels: {
                  steps: 1
              },
              title: {
                  text: 'Hours'
              },
              min: 12,
              max: 18,
              tickInterval: 1
          }

      };

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
      // this.initializeItems();
      this.itemTmp = new Item('d', 'd', true, 'd');


      this.loading = this.load.create({
          content: 'Reading data...'
      });

      this.lService.getCoords(item.name).subscribe(
          data => {
              console.log("Data: " + data);

              let lng = data.results[0].geometry.location.lng;
              let lat = data.results[0].geometry.location.lat;
              lat = this.round(lat, 1);
              lng = this.round(lng, 1);


              this.iService.getInfo(lat, lng).subscribe(
                  data =>
                  {
                      this.loading.present();
                    console.log(data);
                        this.itemTmp.UVIndex = data.UVIndex;
                        this.itemTmp.algalConcentration = data.algalConcentration;
                      this.itemTmp.badgeColor = data.badgeColor;
                      this.itemTmp.recommendedHours = data.recommendedHours;
                      this.itemTmp.recommendation1 = data.recommendation1;
                      this.itemTmp.recommendation2 = data.recommendation2;
                      this.itemTmp.recommendation3 = data.recommendation3;
                      this.itemTmp.HoursGraph = data.HoursGraph;
                      this.itemTmp.UVGraph = data.UVGraph;

                      this.loading.dismiss();
                      this.itemTmp.hidden = false;
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log('Information Search Complete')

              );

          },
          err => {
              console.log("Error location");
              console.log(err);
          },
          () => console.log('Location Search Complete'));

      this.itemTmp.name = item.name;
      this.itemTmp.url = item.url;
      this.itemTmp.icon = item.icon;
      this.itemTmp.clouds = "No clouds";
      this.itemTmp.temperature = 39.5;
      this.itemSearch = null;
      this.itemList = false;
      this.show = true;
  }

      getUV(uv: number) {

        let result = "";

        if(uv <= 3) {
            result = "Low";
        }
        else if(uv >= 4 && uv <= 5) {
            result = "Medium";
        }
        else if(uv >= 6 && uv <= 7) {
            result = "High";
        }
        else if(uv >= 8) {
            result = "Ultra High";
        }

        return result;

    }


    getHub(uv: number) {

        let result = "";

        if(uv >= 0 && uv <= 7) {
            result = "Low";
        }
        else if(uv > 7 && uv <= 10) {
            result = "Medium";
        }
        else{
            result = "High";
        }

        return result;

    }

  getHubColor(uv: any) {

      uv = Number(uv);
      let result = "";

      if(uv >= 0 && uv <= 7) {
          result = "#1aff66";
      }
      else if(uv > 7 && uv <= 10) {
          result = "#ffff00";
      }
      else{
          result = "#ff5050";
      }

      return result;
  }


  getBadgeIcon() {

      let icon = "";

      if(this.itemTmp.badgeColor === "#1aff66") {
          icon = "fa-check-square-o";
      }
      else if(this.itemTmp.badgeColor === "#ffff00") {
          icon = "fa-check-square-o";
      }
      else if(this.itemTmp.badgeColor === "#ffb31a") {
          icon = "fa-check-square-o";
      }
      else if(this.itemTmp.badgeColor === "#ffeb19") {
          icon = "fa-check-square-o";
      }
      else {
          icon = "remove";
      }

      return icon;


  }





}
