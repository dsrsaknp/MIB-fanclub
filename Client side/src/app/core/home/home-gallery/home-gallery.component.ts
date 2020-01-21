import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HomeService } from './../../../shared-services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.css']
})
export class HomeGalleryComponent implements OnInit {

  public galleryData = [];
  constructor(private homeService: HomeService, private apiErrorService: HandleApiErrorService) { }

  ngOnInit() {
    this.homeService.getImages().subscribe(data => {
      this.setGalleryData(data);
    },
      error => {
        this.apiErrorService.apiError.emit(error);

      }
    );
  }
  setGalleryData(data) {
    this.galleryData = data;
  }

}
