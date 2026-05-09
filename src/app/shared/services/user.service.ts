import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/auth/api/create_user/';
  private loginUrl = 'http://127.0.0.1:8000/auth/api/login/'

  constructor(private http: HttpClient) { }

  createUser(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  loginUser(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }
}
