import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'app/_services/_contrats/api.service';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css']
})
export class ContratsComponent implements OnInit {

  constructor(public matDialog: MatDialog, private api: ApiService, private router: Router) { }

  lstCtr
  ngOnInit(): void {
    this.api.getContarts().subscribe(
      (res: any) => {
        this.lstCtr = res;
        console.log(this.lstCtr)
      },
      err => {
        console.log(err);
      },
    )
  }

  openDialog(ctr) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "add-employe-component";
    //dialogConfig.height = "703px";
    dialogConfig.width = "500px";
    dialogConfig.data = ctr;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(InfoComponent, dialogConfig);
  }



}
