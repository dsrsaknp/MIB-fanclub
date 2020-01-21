import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HomeService } from './../../../shared-services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  public onHoverClass = '';
  public fixtures = [
    {
      team1: 'IND',
      team2: 'ENG',
      date: '',
      venue: ''
    }
  ];

  constructor(private homeService: HomeService, private apiErrorService: HandleApiErrorService) { }

  ngOnInit() {
    this.homeService.getCalender().subscribe(
      data => {
        this.setCalander(data);
      },
      error => {
        this.apiErrorService.apiError.emit(error);

      }
    );
  }
  setCalander(data) {
    this.fixtures = data;
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
}
