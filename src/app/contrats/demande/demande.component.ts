import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/_services/_contrats/api.service';


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demande
  constructor(public dialogRef: MatDialogRef<DemandeComponent>,
		@Inject(MAT_DIALOG_DATA) data,private api: ApiService) { 
      this.demande=data

    }

    refuser(){
      this.api.refuser().subscribe(
        (res: any) => {
          console.log(res)
        },
        err => {
          console.log(err);
        },
      )
    }

    accpeter(){
      this.api.accpeter().subscribe(
        (res: any) => {
          console.log(res)
        },
        err => {
          console.log(err);
        },
      )
    }

  ngOnInit(): void {
    
  }

}
