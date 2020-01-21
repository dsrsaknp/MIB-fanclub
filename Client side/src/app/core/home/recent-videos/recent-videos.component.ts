import { RecentVideoDialogComponent } from './../recent-video-dialog/recent-video-dialog.component';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HomeService } from './../../../shared-services/home.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-recent-videos',
  templateUrl: './recent-videos.component.html',
  styleUrls: ['./recent-videos.component.css']
})
export class RecentVideosComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private homeService: HomeService,
    private apiErrorService: HandleApiErrorService, private dialog: MatDialog) { }

  public videoLink = [
    { video: 'QtawgmpGh5E' },
    { video: 'h3-4EDW25u4' },
    { video: 'aTN9Fl7F9AI' },
    { video: 'eZZ230o0F-Q' }
  ];
  // public videoLink = [];
  public selectedItem = 0;
  // public videoUrl = 'qDuKsiwS5xw';

  ngOnInit() {
    this.homeService.getVideos().subscribe(data => {
      this.setVideoData(data);
    },
      error => {
        this.apiErrorService.apiError.emit(error);
      }
    );
  }


  setVideoData(data) {
    this.videoLink = data;
  }


  setSelecter(event) {
    this.selectedItem = event.target.id;
    // tslint:disable-next-line:max-line-length
    // this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoLink[this.selectedItem].video + '?rel=0&amp;');
    // $('#exampleModalCenter').modal();
    const dialogRef = this.dialog.open(RecentVideoDialogComponent, {
      width: '80%',
      height: '80%',
      data: { link: this.videoLink[this.selectedItem].video }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
