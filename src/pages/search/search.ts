import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {


  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController) {

  }

  initializeItems() {
    this.items = ['Santa Monica State Beach', 'Manhattan Beach', 'Marina Beach', 'El Matador State Beach'];
  }

}
