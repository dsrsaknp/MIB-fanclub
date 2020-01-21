import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUsers } from '../user/about/IUsers';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AboutService {

  constructor( private http: HttpClient) { }

  private server_url: string = environment.serverUrl;

  private httpOptions = {
    headers : new HttpHeaders({
     'Content-Type' : 'application/json',
     'Authorization' : localStorage.getItem('jwtToken')
    })
  };

  getTestimonials(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.server_url + '/getUserTestimonial');
  }
  saveTestimonial( testimonial ): Observable<IUsers> {
    return this.http.post<IUsers>( this.server_url + '/saveUserTestimonial', testimonial, this.httpOptions);
  }
}
