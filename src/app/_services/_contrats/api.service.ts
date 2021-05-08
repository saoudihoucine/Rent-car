import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3003/api/';


  constructor(private http: HttpClient) { }


  getContarts() {

    return this.http.get(this.apiUrl + 'contrat');
  }

  getClients() {
    return this.http.get(this.apiUrl + 'clients');
  }

  getNotif() {
    return this.http.post(this.apiUrl + 'Contrat/GetTab', "");
  }

  getVheculesDispo() {

    return this.http.get(this.apiUrl + 'vehicule/Veh_Dispo');
  }

  getVheculesIndispo() {

    return this.http.get(this.apiUrl + 'vehicule/Veh_Indispo');
  }

  accpeter() {

    return this.http.post(this.apiUrl + 'Contrat/Save', "");
  }

  refuser() {

    return this.http.post(this.apiUrl + 'Contrat/refuse', "");
  }


}
