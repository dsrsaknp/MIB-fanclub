import { Router } from '@angular/router';
import { HandleApiErrorService } from './../../../handle-api-error.service';
import { HomeService } from './../../../shared-services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-players',
  templateUrl: './home-players.component.html',
  styleUrls: ['./home-players.component.css']
})
export class HomePlayersComponent implements OnInit {

  public playersData = [];
  constructor(private homeService: HomeService, private apiErrorService: HandleApiErrorService, private router: Router) {

  }

  ngOnInit() {
    this.homeService.getAllPlayers().subscribe(data => {
      this.setPlayersData(data);
    },
    error => {
      this.apiErrorService.apiError.emit(error);

    }
  );
  }

  setPlayersData(data) {
    this.playersData = data;
  }

  loadPlayer(data) {
    sessionStorage.setItem('card_player', data.pid);
    this.router.navigate(['user/team']);

  }

}
