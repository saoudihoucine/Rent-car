import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  data
  constructor(public dialogRef: MatDialogRef<InfoComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.data = data


  }

  ngOnInit(): void {
    document.getElementById("nom").textContent = this.data.NOM + " " + this.data.PRENOM
    document.getElementById("adresse").textContent = this.data.ADRESSE
    document.getElementById("numTel").textContent = this.data.NUMTEL
    document.getElementById("email").textContent = this.data.EMAIL
    document.getElementById("cin").textContent = this.data.CIN_CL
    
  }

  closeModal() {
    this.dialogRef.close();
  }

}
