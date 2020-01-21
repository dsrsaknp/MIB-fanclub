import { HandleApiErrorService } from './../../../handle-api-error.service';
import { ContestService } from './../../../shared-services/contest.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  public labels: string[] = [];
  private data: number[] = [];
  private contestData = [
    {
      "username": "Piyush123",
      "fname": "Piyush",
      "lname": "Nandan",
      "score": 10
    },
    {
      "username": "Vish123",
      "fname": "Vishnu",
      "lname": "Paturu",
      "score": 19
    },
    {
      "username": "Div123",
      "fname": "Divya",
      "lname": "Singh",
      "score": 18
    },
    {
      "username": "Avn123",
      "fname": "Avinash",
      "lname": "Thakur",
      "score": 13
    }, {
      "username": "Ash123",
      "fname": "Ashok",
      "lname": "Kongala",
      "score": 14
    },
  ];


  constructor(private contestService: ContestService, private apiError: HandleApiErrorService) { }

  ngOnInit() {
    // this.data = this.data.sort((a, b) => b - a);
    this.contestService.getLeaderBoard().subscribe(
      data => {
        this.labels = this.filterLabels(data);
        this.data = this.filterData(data);
        this.makeGraph(this.labels, this.data);
      },
      error => {
        this.apiError.apiError.emit(true);
      }
    );
  }



  filterLabels(data): string[] {
    const result: string[] = [];
    data.forEach(element => {
      result.push( element.fname);
    });
    return result;
  }



  test() {
    return true;
  }

  filterData(data): number[] {
    const result: number[] = [];
    data.forEach(element => {
      result.push(element.credits);
    });
    return result;
  }

  makeGraph(lbls, dt) {
    const tx = <HTMLCanvasElement>document.getElementById('leaderboard');
    tx.height = 350;
    const ctx = tx.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lbls,
        datasets: [{
          data: dt,
          backgroundColor: [
            'rgba(255, 99, 132 )',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,

      }
    });
    return true;
  }

}
