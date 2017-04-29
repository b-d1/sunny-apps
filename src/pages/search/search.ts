import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Item } from '../search/Item';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})




export class Search {




  searchQuery: string = '';
  items: Item[];

  constructor(public navCtrl: NavController) {
      this.initializeItems();
  }

  initializeItems() {
    this.items = [new Item('Santa Monica State Beach', 'url', true), new Item('Manhattan Beach', 'url', true), new Item('Marina Beach', 'url', true), new Item('El Matador State Beach', 'url', true)];
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


}
