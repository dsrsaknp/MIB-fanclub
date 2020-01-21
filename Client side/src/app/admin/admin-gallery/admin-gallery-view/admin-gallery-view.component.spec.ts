import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryViewComponent } from './admin-gallery-view.component';

describe('AdminGalleryViewComponent', () => {
  let component: AdminGalleryViewComponent;
  let fixture: ComponentFixture<AdminGalleryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGalleryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGalleryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
