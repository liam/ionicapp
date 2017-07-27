import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  selectedItem: any;
  newItems: any;
  items: any;
  BASE_URL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.BASE_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Fseries%2Feu-referendum-morning-briefing%2Frss";
    this.newItems = [];
    this.items = [];

    this.getFeed(http, this.BASE_URL).then( newItems => this.updateItems(newItems));

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  };


    getFeed(http, url){
      return new Promise(function(resolve){ http.get(url, {}, {}).map(res => res.json()).subscribe(
        data => { resolve(data.items); }
      )});
    };

    updateItems(newItems) {
      this.items = newItems;
    }

    loadMore() {
      console.log('loading more...');
    }

    doRefresh() {
      console.log('refreshing...');
    }

    itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

}
