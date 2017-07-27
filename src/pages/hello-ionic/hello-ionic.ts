import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  deadline: Date;
  counter: object;

  newItems: any;
  items: any;
  BASE_URL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.BASE_URL = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Fpolitics%2Fseries%2Feu-referendum-morning-briefing%2Frss";
    this.newItems = [];
    this.items = [];
    //http.get(this.BASE_URL).map(res => res.json()).subscribe(data => {
    //  this.items = data.items;
    //});
    this.getFeed(http, this.BASE_URL).then( newItems => this.updateItems(newItems));

    this.deadline = new Date('2019-03-29');
    this.counter = {
      days:12,
      hours: 2,
      minutes: 3,
      seconds: 4
      }
    this.counter = getTimeRemaining(this.deadline);
    setInterval(() => this.counter = getTimeRemaining(this.deadline), 1000);

    //setInterval(getTimeRemaining(this.deadline),1000);
  }


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
}
  function getTimeRemaining(deadline: Date) {

    let now = new Date();
    let t: number = deadline.getTime() - now.getTime();
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}
