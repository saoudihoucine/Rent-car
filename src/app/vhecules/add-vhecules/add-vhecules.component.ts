import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { ApiService } from 'app/_services/vehicules/api.service';
import { Vhecule } from 'app/_models/vhecule';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-vhecules',
	templateUrl: './add-vhecules.component.html',
	styleUrls: ['./add-vhecules.component.css']
})


export class AddVheculesComponent implements OnInit {

	@ViewChild('screen') screen: ElementRef;
	@ViewChild('canvas') canvas: ElementRef;
	@ViewChild('downloadLink') downloadLink: ElementRef;
	url;
	msg = "";
	selectedFile: File

	constructor(public dialogRef: MatDialogRef<AddVheculesComponent>, private api: ApiService, private router: Router) { }

	ngOnInit(): void {
	}

	closeModal() {
		this.dialogRef.close();
	}

	addVH(form) {
		let vh = new Vhecule();
		vh.MATRICULE = form.value.matricule;
		vh.MODELE = form.value.modele;
		vh.IMAGE = this.url;
		vh.PRIX = form.value.prix;
		vh.DESCRIPTION = form.value.desc
		vh.carIMG = this.selectedFile;

		// const formData = new FormData();
		// formData.append('carIMG', this.selectedFile)
		// formData.append('MATRICULE', form.value.matricule)
		// formData.append('MODELE', form.value.matricule)
		// formData.append('PRIX', form.value.prix)

		this.api.postVhecules(vh).subscribe(
			(res: any) => {
				console.log(res);
				this.downloadImage()
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


	downloadImage() {
		html2canvas(this.screen.nativeElement).then(canvas => {
			this.canvas.nativeElement.src = canvas.toDataURL();
			this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
			this.downloadLink.nativeElement.download = this.values + '.png';
			this.downloadLink.nativeElement.click();
		});
	}



}
