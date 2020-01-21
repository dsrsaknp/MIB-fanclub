import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {

  constructor(private titleSevice: Title) { }

  ngOnInit() {
    this.titleSevice.setTitle('Contests');
  }

}
