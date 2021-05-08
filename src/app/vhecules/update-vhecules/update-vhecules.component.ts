import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Vhecule } from 'app/_models/vhecule';
import { ApiService } from 'app/_services/vehicules/api.service';

@Component({
	selector: 'app-update-vhecules',
	templateUrl: './update-vhecules.component.html',
	styleUrls: ['./update-vhecules.component.css']
})
export class UpdateVheculesComponent implements OnInit {


	url;
	urlUp;
	msg;
	selectedFile: File
	mat
	matricule: string;
	prix: number
	modele: string
	desc: string


	constructor(public dialogRef: MatDialogRef<UpdateVheculesComponent>,
		@Inject(MAT_DIALOG_DATA) data, private api: ApiService, private router: Router, private sanitizer: DomSanitizer) {

		this.matricule = data.MATRICULE;
		this.prix = data.PRIX;
		this.modele = data.MODELE;
		this.desc = data.DESCRIPTION;
		this.urlUp = this.sanitizer.bypassSecurityTrustResourceUrl(data.IMAGE);
		this.url = data.IMAGE
	}

	ngOnInit(): void {



	}

	closeModal() {
		this.dialogRef.close();
	}

	upVH(form) {
		let vh = new Vhecule();
		vh.MATRICULE = form.value.matricule;
		vh.MODELE = form.value.modele;
		vh.IMAGE = this.url;
		vh.PRIX = form.value.prix;
		vh.DESCRIPTION = form.value.desc;
		vh.carIMG = this.selectedFile;

		// const formData = new FormData();
		// formData.append('carIMG', this.selectedFile)
		// formData.append('MATRICULE', form.value.matricule)
		// formData.append('MODELE', form.value.matricule)
		// formData.append('PRIX', form.value.prix)

		this.api.updateVhecules(vh).subscribe(
			(res: any) => {
				this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
					this.router.navigate(["/vehicules"]); // navigate to same route
				});
				this.closeModal()
			},
			err => {
				console.log(err);
			},
		)



	}



	selectFile(event) {
		if (!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}



		var mimeType = event.target.files[0].type;

		if (event.target.files[0].size > 1000000) {
			this.msg = "Taille trés grande";
			return;
		}

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		this.selectedFile = event.target.files[0]

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}

	values = '';
	onKey(value: string) {
		this.values = value
	}






}
