import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryUpdateComponent } from './admin-gallery-update.component';

describe('AdminGalleryUpdateComponent', () => {
  let component: AdminGalleryUpdateComponent;
  let fixture: ComponentFixture<AdminGalleryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGalleryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGalleryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
