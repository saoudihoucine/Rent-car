import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3003/api/';

  constructor(private http: HttpClient) { }

  myProfile() {
    var token = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.apiUrl + 'employes/verify ', { headers: token });
  }

  
}
