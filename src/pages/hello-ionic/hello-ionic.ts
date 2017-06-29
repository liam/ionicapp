import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  deadline: Date;
  counter: object;

  constructor() {
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
