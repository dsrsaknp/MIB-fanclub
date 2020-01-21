import { MaterialModule } from './../../../material.module';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../shared-services/api.service';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public screenWidth;
  public pid;
  public open = true;
  public isActive;
  public players;
  inProgress = true;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.inProgress = true;
    this.api.loadAllPlayers().subscribe(data => {
      // console.log(data);
      this.players = data;
    });

    if (sessionStorage.getItem('card_player')) {
      this.pid = sessionStorage.getItem('card_player');
      this.loadPlayer();
    } else if (this.route.snapshot) {
      this.pid = parseInt(this.route.snapshot.paramMap.get('name'), 10);
      this.loadPlayer();

    } else {
      this.router.navigate(['/user/team', '253802']);
    }

    this.inProgress = false;

  }

  callPlayer(index) {
    this.isActive = index;
    this.pid = index;
    this.loadPlayer();
  }
loadPlayer() {
  this.isActive = this.pid;
  this.router.navigate(['/user/team', this.pid]);

}

  toggle() {
    this.open = !this.open;
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('card_player');
  }


}
