import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsViewComponent } from './admin-news-view.component';

describe('AdminNewsViewComponent', () => {
  let component: AdminNewsViewComponent;
  let fixture: ComponentFixture<AdminNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
