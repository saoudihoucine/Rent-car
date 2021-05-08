import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrat } from "../../../models/Contrat";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3003/api/';


  constructor(private http: HttpClient) { }


  getVhecules() {
    return this.http.get(this.apiUrl + 'vehicule/Veh_Dispo');
  }

  postContrat(contrat: Contrat) {

    return this.http.post(this.apiUrl + 'Contrat/send', contrat);

  }
}
