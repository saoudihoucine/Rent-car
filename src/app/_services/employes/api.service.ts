import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from 'app/_models/employe';
import { Login } from 'app/_models/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3003/api/';


  constructor(private http: HttpClient) { }


  getEmployes() {

    return this.http.get(this.apiUrl + 'employes');
  }

  postEmploye(emp: Employe) {

    return this.http.post(this.apiUrl + 'employes', emp);

  }

  deleteEmploye(cin) {

    return this.http.delete(this.apiUrl + 'employes/' + cin);
  }



  login(userLogin: Login) {

    return this.http.post(this.apiUrl + 'employes/login', userLogin);

  }

  updateEmploye(emp: Employe) {

    return this.http.put(this.apiUrl + 'employes/' + emp.CIN_EMP, emp);
  }
}
