import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryDeleteComponent } from './admin-gallery-delete.component';

describe('AdminGalleryDeleteComponent', () => {
  let component: AdminGalleryDeleteComponent;
  let fixture: ComponentFixture<AdminGalleryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGalleryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGalleryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
