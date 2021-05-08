import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AddVheculesComponent } from 'app/vhecules/add-vhecules/add-vhecules.component';
import { ApiService } from 'app/_services/vehicules/api.service';
import { UpdateVheculesComponent } from './update-vhecules/update-vhecules.component';
import Swal from 'sweetalert2/dist/sweetalert2.js'






@Component({
  selector: 'app-vhecules',
  templateUrl: './vhecules.component.html',
  styleUrls: ['./vhecules.component.css']
})
export class VheculesComponent implements OnInit {
  constructor(public matDialog: MatDialog, private api: ApiService, private sanitizer: DomSanitizer, private router: Router) { }

  lst
  ngOnInit(): void {
    this.api.getVhecules().subscribe(
      (res: any) => {
        this.lst = res;
      },
      err => {
        console.log(err);
      },
    )
  }



  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-vhecules-component";
    dialogConfig.height = "703px";
    dialogConfig.width = "999px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AddVheculesComponent, dialogConfig);
  }

  updtDialog(assu) {


    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "update-vhecules.component";
    dialogConfig.height = "500px";
    dialogConfig.width = "999px";
    dialogConfig.data = assu;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UpdateVheculesComponent, dialogConfig);
  }

  deleteVh(mat) {


    Swal.fire({
      title: 'Voulez-vous vraiment supprimer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OUI!',
      cancelButtonText: 'NON'
    }).then((result) => {
      if (result.value) {

        this.api.deleteVhecules(mat).subscribe(
          (res: any) => {

            Swal.fire(
              'Supprimé!',
              'Le véhicule a été supprimé',
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

  transform(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }





}
