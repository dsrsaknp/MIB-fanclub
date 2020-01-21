import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { ApiService } from './api.service';
import { TestBed, inject } from '@angular/core/testing';


describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
