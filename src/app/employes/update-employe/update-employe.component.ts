import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employe } from 'app/_models/employe';
import { ApiService } from 'app/_services/employes/api.service';

@Component({
  selector: 'app-update-employe',
  templateUrl: './update-employe.component.html',
  styleUrls: ['./update-employe.component.css']
})
export class UpdateEmployeComponent implements OnInit {
  cin; nom; prenom; adresse; email; numTel
  constructor(public dialogRef: MatDialogRef<UpdateEmployeComponent>, private api: ApiService, private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {

    let employe = new Employe();
    this.cin = data.CIN_EMP;
    this.nom = data.NOM;
    this.prenom = data.PRENOM;
    this.adresse = data.ADRESSE;
    this.numTel = data.NUMTEL;
    this.email = data.EMAIL;
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  upEmp(form) {

    let employe = new Employe();
    employe.CIN_EMP = form.value.cin;
    employe.NOM = form.value.nom;
    employe.PRENOM = form.value.prenom;
    employe.ADRESSE = form.value.adresse;
    employe.NUMTEL = form.value.numTel;
    employe.EMAIL = form.value.email;

    this.api.updateEmploye(employe).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/employes"]); // navigate to same route
        });
        this.closeModal()
      },
      err => {
        console.log(err);
      },
    )



  }

}
