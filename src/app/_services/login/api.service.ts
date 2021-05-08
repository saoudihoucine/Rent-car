import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_models/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://192.168.43.83:3003/api/';
  constructor(private http: HttpClient) { }

  login(userLogin: Login) {

    return this.http.post(this.apiUrl + 'employes/login', userLogin);

  }
}
