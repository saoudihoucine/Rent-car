import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'app/_services/employes/api.service';
import Swal from 'sweetalert2';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { UpdateEmployeComponent } from './update-employe/update-employe.component';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  constructor(public matDialog: MatDialog, private api: ApiService, private router: Router) { }

  lstEmp
  ngOnInit(): void {
    this.api.getEmployes().subscribe(
      (res: any) => {
        this.lstEmp = res;
      },
      err => {
        console.log(err);
      },
    )
  }

  deleteEmp(cin) {

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.value) {

        this.api.deleteEmploye(cin).subscribe(
          (res: any) => {

            Swal.fire(
              'Supprimé!',
              'Employe a été supprimé',
              'success'
            )

            const currentRoute = this.router.url;

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route

            });

            console.log(res)
          }
        )
      }
    })

  }



  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-employe-component";
    //dialogConfig.height = "703px";
    dialogConfig.width = "999px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AddEmployeComponent, dialogConfig);
  }

  updtDialog(emp) {


    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "update-employe.component";
    dialogConfig.height = "500px";
    dialogConfig.width = "999px";
    dialogConfig.data = emp;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UpdateEmployeComponent, dialogConfig);
  }

}
