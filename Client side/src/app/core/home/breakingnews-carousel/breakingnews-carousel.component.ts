import { HomeService } from './../../../shared-services/home.service';
import { Component, OnInit, Input } from '@angular/core';
import { HandleApiErrorService } from '../../../handle-api-error.service';

@Component({
  selector: 'app-breakingnews-carousel',
  templateUrl: './breakingnews-carousel.component.html',
  styleUrls: ['./breakingnews-carousel.component.css']
})
export class BreakingnewsCarouselComponent implements OnInit {

  public news = [];
  public panelOpenState = false;
  constructor(private homeService: HomeService, private apiErrorService: HandleApiErrorService) { }

  ngOnInit() {
    this.homeService.getNews().subscribe(data => {
      this.setNews(data);
    },
      error => {
        this.apiErrorService.apiError.emit(error);

      }
    );
  }
  setNews(data) {
    this.news = data;
  }

}
