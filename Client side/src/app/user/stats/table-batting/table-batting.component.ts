import { ApiService } from './../../../shared-services/api.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table-batting',
  templateUrl: './table-batting.component.html',
  styleUrls: ['./table-batting.component.css']
})
export class TableBattingComponent implements OnInit, OnChanges {

  @Input() pid;
  public player;
  public odi_mat;
  public odi_inns;
  public odi_runs;
  public odi_hs;
  public odi_avg;
  public odi_sr;
  public odi_50s;
  public odi_100s;
  public odi_6s;
  public odi_4s;
  public tests_mat;
  public tests_inns;
  public tests_runs;
  public tests_hs;
  public tests_avg;
  public tests_sr;
  public tests_50s;
  public tests_100s;
  public tests_4s;
  public tests_6s;
  public ttwenty_mat;
  public ttwenty_inns;
  public ttwenty_runs;
  public ttwenty_hs;
  public ttwenty_avg;
  public ttwenty_sr;
  public ttwenty_50s;
  public ttwenty_100s;
  public ttwenty_4s;
  public ttwenty_6s;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.playerLoad();
  }

  ngOnChanges(changes: any) {
this.playerLoad();

}

playerLoad() {
  this.api.loadPlayer(this.pid).subscribe(data => {
   this.playerBatting(data);

  });
}


playerBatting(data) {
  this.player = data;

  this.odi_mat = this.player.data.batting.ODIs.Mat;
  this.odi_inns = this.player.data.batting.ODIs.Inns;
  this.odi_runs = this.player.data.batting.ODIs.Runs;
  this.odi_hs = this.player.data.batting.ODIs.HS;
  this.odi_avg = this.player.data.batting.ODIs.Ave;
  this.odi_sr = this.player.data.batting.ODIs.SR;
  this.odi_50s = this.player.data.batting.ODIs['50'];
  this.odi_100s = this.player.data.batting.ODIs['100'];
  this.odi_6s = this.player.data.batting.ODIs['6s'];
  this.odi_4s = this.player.data.batting.ODIs['4s'];


  this.tests_mat = this.player.data.batting.tests.Mat;
  this.tests_inns = this.player.data.batting.tests.Inns;
  this.tests_runs = this.player.data.batting.tests.Runs;
  this.tests_hs = this.player.data.batting.tests.HS;
  this.tests_avg = this.player.data.batting.tests.Ave;
  this.tests_sr = this.player.data.batting.tests.SR;
  this.tests_50s = this.player.data.batting.tests['50'];
  this.tests_100s = this.player.data.batting.tests['100'];
  this.tests_4s = this.player.data.batting.tests['4s'];
  this.tests_6s = this.player.data.batting.tests['6s'];



  this.ttwenty_mat = this.player.data.batting.T20Is.Mat;
  this.ttwenty_inns = this.player.data.batting.T20Is.Inns;
  this.ttwenty_runs = this.player.data.batting.T20Is.Runs;
  this.ttwenty_hs = this.player.data.batting.T20Is.HS;
  this.ttwenty_avg = this.player.data.batting.T20Is.Ave;
  this.ttwenty_sr = this.player.data.batting.T20Is.SR;
  this.ttwenty_50s = this.player.data.batting.T20Is['50'];
  this.ttwenty_100s = this.player.data.batting.T20Is['100'];
  this.ttwenty_4s = this.player.data.batting.T20Is['4s'];
  this.ttwenty_6s = this.player.data.batting.T20Is['6s'];
}

}
