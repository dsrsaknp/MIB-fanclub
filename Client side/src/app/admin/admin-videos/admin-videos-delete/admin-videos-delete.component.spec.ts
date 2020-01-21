import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideosDeleteComponent } from './admin-videos-delete.component';

describe('AdminVideosDeleteComponent', () => {
  let component: AdminVideosDeleteComponent;
  let fixture: ComponentFixture<AdminVideosDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideosDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
