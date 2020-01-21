import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsDeleteComponent } from './admin-news-delete.component';

describe('AdminNewsDeleteComponent', () => {
  let component: AdminNewsDeleteComponent;
  let fixture: ComponentFixture<AdminNewsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
