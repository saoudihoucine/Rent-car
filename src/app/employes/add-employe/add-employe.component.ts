import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employe } from 'app/_models/employe';
import { ApiService } from 'app/_services/employes/api.service';




@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEmployeComponent>, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addEmp(form) {

    let employe = new Employe();
    employe.CIN_EMP = form.value.cin;
    employe.NOM = form.value.nom;
    employe.PRENOM = form.value.prenom;
    employe.ADRESSE = form.value.adresse;
    employe.NUMTEL = form.value.numTel;
    employe.EMAIL = form.value.email;
    employe.MOTDEPASSE = form.value.nom + "_" + form.value.cin

    console.log(employe)
    this.api.postEmploye(employe).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/employes"]);
        });
        this.closeModal()
      },
      err => {
        console.log(err);
      },
    )

  }


  closeModal() {
    this.dialogRef.close();
  }

}
