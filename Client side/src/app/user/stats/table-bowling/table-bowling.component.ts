import { ApiService } from './../../../shared-services/api.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-table-bowling',
  templateUrl: './table-bowling.component.html',
  styleUrls: ['./table-bowling.component.css']
})
export class TableBowlingComponent implements OnInit, OnChanges {

  @Input() pid;
  public player;
  public odi_mat;
  public odi_inns;
  public odi_balls;
  public odi_runs;
  public odi_wickets;
  public odi_avg;
  public odi_econ;
  public odi_sr;
  public odi_bbm;
  public odi_bbi;
  public tests_mat;
  public tests_inns;
  public tests_balls;
  public tests_runs;
  public tests_wickets;
  public tests_avg;
  public tests_econ;
  public tests_sr;
  public tests_bbm;
  public tests_bbi;
  public ttwenty_mat;
  public ttwenty_inns;
  public ttwenty_balls;
  public ttwenty_runs;
  public ttwenty_wickets;
  public ttwenty_avg;
  public ttwenty_econ;
  public ttwenty_sr;
  public ttwenty_bbm;
  public ttwenty_bbi;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }


  ngOnChanges() {
    this.api.loadPlayer(this.pid).subscribe(data => {
      this.playerBowling(data);

    });

  }

  playerBowling(value) {
    this.player = value;

      this.odi_mat = this.player.data.bowling.ODIs.Mat;
      this.odi_inns = this.player.data.bowling.ODIs.Inns;
      this.odi_balls = this.player.data.bowling.ODIs.Balls;
      this.odi_runs = this.player.data.bowling.ODIs.Runs;
      this.odi_wickets = this.player.data.bowling.ODIs.Wkts;
      this.odi_avg = this.player.data.bowling.ODIs.Ave;
      this.odi_econ = this.player.data.bowling.ODIs.Econ;
      this.odi_sr = this.player.data.bowling.ODIs.SR;
      this.odi_bbm = this.player.data.bowling.ODIs.BBM;
      this.odi_bbi = this.player.data.bowling.ODIs.BBI;


      this.tests_mat = this.player.data.bowling.tests.Mat;
      this.tests_inns = this.player.data.bowling.tests.Inns;
      this.tests_balls = this.player.data.bowling.tests.Balls;
      this.tests_runs = this.player.data.bowling.tests.Runs;
      this.tests_wickets = this.player.data.bowling.tests.Wkts;
      this.tests_avg = this.player.data.bowling.tests.Ave;
      this.tests_econ = this.player.data.bowling.tests.Econ;
      this.tests_sr = this.player.data.bowling.tests.SR;
      this.tests_bbm = this.player.data.bowling.tests.BBM;
      this.tests_bbi = this.player.data.bowling.tests.BBI;



      this.ttwenty_mat = this.player.data.bowling.T20Is.Mat;
      this.ttwenty_inns = this.player.data.bowling.T20Is.Inns;
      this.ttwenty_balls = this.player.data.bowling.T20Is.Balls;
      this.ttwenty_runs = this.player.data.bowling.T20Is.Runs;
      this.ttwenty_wickets = this.player.data.bowling.T20Is.Wkts;
      this.ttwenty_avg = this.player.data.bowling.T20Is.Ave;
      this.ttwenty_econ = this.player.data.bowling.T20Is.Econ;
      this.ttwenty_sr = this.player.data.bowling.T20Is.SR;
      this.ttwenty_bbm = this.player.data.bowling.T20Is.BBM;
      this.ttwenty_bbi = this.player.data.bowling.T20Is.BBI;
  }


}
