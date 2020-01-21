import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsUpdateComponent } from './admin-news-update.component';

describe('AdminNewsUpdateComponent', () => {
  let component: AdminNewsUpdateComponent;
  let fixture: ComponentFixture<AdminNewsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
