import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('FIlter label', () => {
    component = fixture.debugElement.componentInstance;
    const contestData = [
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
    const expected = ['Piyush', 'Vishnu', 'Divya', 'Avinash', 'Ashok'];
    // expect(component.filterLabels(contestData)).toEqual(expected);
    const result = component.filterLabels(contestData);
    expect(result).toEqual(expected);
  });

  it('FIlter Data', () => {
    component = fixture.debugElement.componentInstance;
    const contestData = [
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
    const expected = [10, 19, 18, 13, 14];
    // expect(component.filterLabels(contestData)).toEqual(expected);
    const result = component.filterData(contestData);
    expect(result).toEqual(expected);
  });
  it('Make graph', () => {
    component = fixture.debugElement.componentInstance;
    const labels = ['Piyush', 'Vishnu', 'Divya', 'Avinash', 'Ashok'];
    const data = [10, 19, 18, 13, 14];
    expect(component.makeGraph(labels, data)).toBeTruthy();
  });
});
