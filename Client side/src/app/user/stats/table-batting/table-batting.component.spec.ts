import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './../../../shared-services/api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBattingComponent } from './table-batting.component';

import * as data from './../../../../assets/player_data.json';


describe('TableBattingComponent', () => {
  let component: TableBattingComponent;
  let fixture: ComponentFixture<TableBattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ TableBattingComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should get batting stats', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.playerBatting(data)).toEqual(undefined);
  });
  });

