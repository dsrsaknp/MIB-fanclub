import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './../../shared-services/api.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnChanges {

  @Input() pid;

  public player;
  public player_name;
  public player_age;
  public player_img;
  public player_fullName;
  public player_born;
  public player_playingRole;
  public player_battingStyle;
  public player_majorTeams;
  public player_profile;

  public show = true;

  public serverError = true;

  constructor(private api: ApiService, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Your team');
    this.loadPlayer();

  }




  ngOnChanges() {
    this.loadPlayer();

  }



  loadPlayer() {
    this.api.loadPlayer(this.pid).subscribe(data => {
      this.playerData(data);

    });
  }

  playerData(data) {
    this.player = data;
    this.player_name = this.player.name;
    this.player_age = this.player.currentAge.substring(0, 8);
    this.player_img = this.player.imageURL;
    this.player_fullName = this.player.fullName;
    this.player_born = this.player.born;
    this.player_playingRole = this.player.playingRole;
    this.player_battingStyle = this.player.battingStyle;
    this.player_majorTeams = this.player.majorTeams;
    this.player_profile = this.player.profile;
  }

  showNav() {
    this.show = !this.show;
  }

}
