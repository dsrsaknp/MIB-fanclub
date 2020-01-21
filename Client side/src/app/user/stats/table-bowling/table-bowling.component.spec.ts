import { ApiService } from './../../../shared-services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBowlingComponent } from './table-bowling.component';
import { empty } from 'rxjs/Observer';

import * as data from './../../../../assets/player_data.json';

fdescribe('TableBowlingComponent', () => {
  let component: TableBowlingComponent;
  let fixture: ComponentFixture<TableBowlingComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ TableBowlingComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBowlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bowling stats', () => {
 const app = fixture.debugElement.componentInstance;
    expect(app.playerBowling(data)).toEqual(undefined);
  });
});
