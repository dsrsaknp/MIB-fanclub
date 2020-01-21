import { ApiService } from './../../shared-services/api.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  dummyMatchData;
  public matchData;
  public matchData1;
  end = 2;
  matchLength;
  constructor(private api: ApiService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Calendar');
    this.api.getMatches().subscribe(data => {
      this.dummyMatchData = data;
      this.matchLength = this.dummyMatchData.length;
      this.matchData = this.dummyMatchData.splice(0, 3);
    });

    this.api.getMatches1().subscribe(data => {
      this.matchData1 = data;
    });
  }


  hoverEffect(event) {
    if (event.type === 'mouseenter') {
      event.target.style = `-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);
      -moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);
      box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);z-index:3`;
      // console.log(event.target);

    } else if (event.type === 'mouseleave') {
      event.target.style = '';

    }

  }



  loadMore() {

      if (this.end > (this.matchLength )) {
      }
      this.end = this.end + 3;
      this.matchData = this.dummyMatchData.slice(0, this.end + 1);

  }
}
