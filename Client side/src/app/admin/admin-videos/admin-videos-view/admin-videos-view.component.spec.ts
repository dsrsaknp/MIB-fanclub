import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideosViewComponent } from './admin-videos-view.component';

describe('AdminVideosViewComponent', () => {
  let component: AdminVideosViewComponent;
  let fixture: ComponentFixture<AdminVideosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
