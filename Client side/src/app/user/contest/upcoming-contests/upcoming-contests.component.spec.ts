import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingContestsComponent } from './upcoming-contests.component';

describe('UpcomingContestsComponent', () => {
  let component: UpcomingContestsComponent;
  let fixture: ComponentFixture<UpcomingContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
