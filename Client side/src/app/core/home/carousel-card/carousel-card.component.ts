import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {

  @Input() data;
  public indCardStyle = {
    'background-color': '#304FFE',
    'color': '#fff'
  };
  constructor() { }

  ngOnInit() {
  }

}
