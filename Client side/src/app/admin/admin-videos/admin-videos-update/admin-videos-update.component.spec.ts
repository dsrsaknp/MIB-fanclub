import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideosUpdateComponent } from './admin-videos-update.component';

describe('AdminVideosUpdateComponent', () => {
  let component: AdminVideosUpdateComponent;
  let fixture: ComponentFixture<AdminVideosUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVideosUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
