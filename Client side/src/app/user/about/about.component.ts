import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../shared-services/about.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  isEmpty = true;
  isLoggedIn = false;
  public userName: any;
  public user: any = '';
  public response: any = '';
  public testimonials: any = [];
  public isValid: any = false;
  public players:any;
  showLogInError = false;

  constructor(private aboutService: AboutService, private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('About us');
    if (localStorage.getItem('userName')) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('userName');
    }
    this.aboutService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }

  OnSubmit() {
    if (this.isLoggedIn && this.response !== '') {
      this.showLogInError = false;
      const newTestimonial = {
        'username': this.userName,
        'response': this.response
      };

      this.aboutService.saveTestimonial(JSON.stringify(newTestimonial)).subscribe(result => {
        this.isValid = result;
        console.log('isValid::::result::', result);

        if (this.isValid) {
          this.testimonials.push(this.response);
          console.log('updated testimonial list:::', this.testimonials);
          this.ngOnInit();
          this.user = '';
          this.response = '';
        } else {
          console.log('Something went wrong!');
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.showLogInError = true;
      return false;
    }
  }

  goToContest() {
    this.router.navigate(['user/contests']);
  }

  goToStatistics() {
    this.router.navigate(['user/team/253802']);
  }

  goToStore() {
    this.router.navigate(['store']);
  }

  goToGallery() {
    this.router.navigate(['user/gallery']);
  }

  goToNews() {
    this.router.navigate(['user/stories']);
  }

}
