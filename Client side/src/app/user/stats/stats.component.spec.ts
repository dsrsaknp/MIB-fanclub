import { UserRoutingModule } from './../user-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../shared-services/api.service';
import { TableBattingComponent } from './table-batting/table-batting.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { TableBowlingComponent } from './table-bowling/table-bowling.component';
import { Router } from '@angular/router';

import * as data from './../../../../assets/player_data.json';




describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ StatsComponent, PlayerStatsComponent, TableBattingComponent, TableBowlingComponent ],
      providers: [
        {provide: Router, useClass: UserRoutingModule},
        ApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
