import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vhecule } from 'app/_models/vhecule';
import { Login } from 'app/_models/login';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3003/api/';


  constructor(private http: HttpClient) { }


  getVhecules() {

    return this.http.get(this.apiUrl + 'vehicule');
  }


  postVhecules(vh: Vhecule) {

    return this.http.post(this.apiUrl + 'vehicule', vh);

  }

  deleteVhecules(mat: number) {

    return this.http.delete(this.apiUrl + 'vehicule/' + mat);
  }

  updateVhecules(vehicule: Vhecule) {

    return this.http.put(this.apiUrl + 'vehicule/' + vehicule.MATRICULE, vehicule);
  }

 

}
