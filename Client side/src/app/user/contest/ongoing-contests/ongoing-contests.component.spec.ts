import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingContestsComponent } from './ongoing-contests.component';

describe('OngoingContestsComponent', () => {
  let component: OngoingContestsComponent;
  let fixture: ComponentFixture<OngoingContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
