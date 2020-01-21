import { ApiService } from './../../../shared-services/api.service';
import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { OnChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-player-stats',
    templateUrl: './player-stats.component.html',
    styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, OnChanges {

    @Input() pid;
    public player;
    public test_score;
    public odi_score;
    public t20_score;
    public test_wickets;
    public odi_wickets;
    public t20_wickets;

    //   public firstClass_score;
    //   public listA_score;
    //   public twenty20_score;

    constructor(public api: ApiService) { }
    scoreChart;
    pieChart;
    loadBowl;
    loadBowlPie;
    isChart = false;
    ngOnChanges(changes: any) {
        if (this.isChart) {
            // this.clearData();
            this.clearPie();
            // this.clearBowl();
            this.clearBowlPie();

        }
        this.pid = this.api.getPid();
        this.api.loadPlayer(this.pid).subscribe(data => {
            this.player = data;
            this.test_score = parseInt(this.player.data.batting.tests.Runs, 10);
            this.odi_score = parseInt(this.player.data.batting.ODIs.Runs, 10);
            this.t20_score = parseInt(this.player.data.batting.T20Is.Runs, 10);
            this.test_wickets = parseInt(this.player.data.bowling.tests.Wkts, 10);
            this.odi_wickets = parseInt(this.player.data.bowling.ODIs.Wkts, 10);
            this.t20_wickets = parseInt(this.player.data.bowling.T20Is.Wkts, 10);
            // this.firstClass_score = parseInt(this.player.data.batting.firstClass.Runs, 10);
            // this.listA_score = parseInt(this.player.data.batting.listA.Runs, 10);
            // this.loadData();
            this.loadPie();
            // this.bowlData();
            this.bowlStats();
        });
    }

    ngOnInit() {


    }


    loadPie() {
        const tx = <HTMLCanvasElement>document.getElementById('pieChart');
        tx.height = 100;
        tx.width = 100;
        const ctx = tx.getContext('2d');
        // ctx.destroy();

        const pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {

                labels: ['Tests', 'ODIs', 'T20Is'],
                datasets: [{
                    label: '#Score',
                    data: [this.test_score, this.odi_score, this.t20_score],
                    backgroundColor: [
                        'skyblue', 'lightgreen', 'yellow'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        this.pieChart = pieChart;
    }

    clearPie() {
        this.pieChart.destroy();
    }

    bowlStats() {
        const tx = <HTMLCanvasElement>document.getElementById('loadBowlPie');
        tx.height = 100;
        tx.width = 100;
        const ctx = tx.getContext('2d');
        // ctx.destroy();

        const loadBowlPie = new Chart(ctx, {
            type: 'pie',
            data: {

                labels: ['Tests', 'ODIs', 'T20Is'],
                datasets: [{
                    label: '#wickets',
                    data: [this.test_wickets, this.odi_wickets, this.t20_wickets],
                    backgroundColor: [
                        'skyblue', 'lightgreen', 'yellow'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        this.loadBowlPie = loadBowlPie;
    }

    clearBowlPie() {
        this.loadBowlPie.destroy();
    }
}

