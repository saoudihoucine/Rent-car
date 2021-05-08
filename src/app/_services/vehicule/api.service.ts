import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://192.168.43.83:3003/api/';
  constructor(private http: HttpClient) { }

  getVehicule(matricule) {
    return this.http.get(this.apiUrl + 'vehicule/' + matricule);
  }

  updateVehicule(vehicule) {
    return this.http.put(this.apiUrl + 'vehicule/' + vehicule.MATRICULE, vehicule)
  }
}
