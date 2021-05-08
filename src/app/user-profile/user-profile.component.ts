import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employe } from 'app/_models/employe';
import { ApiService } from 'app/_services/employes/api.service';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;
  disable: boolean;
  nom: string;
  cin: string;
  prenom: string;
  adresse: string;
  email: any;
  numTel: any;
  constructor(public dialogRef: MatDialogRef<UserProfileComponent>, private api: ApiService) { }

  ngOnInit() {
    var profile = jwt_decode(localStorage.getItem("token"));
    this.profile = profile["login"]
    this.nom = this.profile.nom
    this.adresse = this.profile.adresse
    this.prenom = this.profile.prenom
    this.cin = this.profile.cin;
    this.email = this.profile.email
    this.numTel = this.profile.numTel

  }

  closeModal() {
    this.dialogRef.close();
  }



  modProfile(form) {

    let employe = new Employe();
    employe.CIN_EMP = form.value.cin;
    employe.NOM = form.value.nom;
    employe.PRENOM = form.value.prenom;
    employe.ADRESSE = form.value.adresse;
    employe.NUMTEL = form.value.numTel;
    employe.EMAIL = form.value.email;


    this.api.updateEmploye(employe).subscribe(
      (res: any) => {
        Swal.fire(
          'Modifié!',
          'Votre profile a été modifié',
          'success'
        )
        this.closeModal()
      },
      err => {
        console.log(err);
      },
    )
  }

  

}
