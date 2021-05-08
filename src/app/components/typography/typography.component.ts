import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'app/services/vehicule/vehicules/api.service';
import { Contrat } from 'app/models/Contrat';







@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class TypographyComponent implements OnInit {
  lst: any;

  constructor(private api: ApiService, private sanitizer: DomSanitizer,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.api.getVhecules().subscribe(
      (res: any) => {
        this.lst = res;
      },
      err => {
        console.log(err);
      },
    )
  }


  transform(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  postContrat(form, mat) {
    let contrat = new Contrat();
    contrat.EMAIL = form.value.email
    contrat.CIN = form.value.cin
    contrat.NOM = form.value.nom
    contrat.PRENOM = form.value.prenom
    contrat.ADRESSE = form.value.adr
    contrat.NUMTEL = form.value.numTel
    contrat.MATRICULE = mat
    contrat.DATEDEB = form.value.dateDeb
    contrat.DATEFIN = form.value.dateFin
    this.api.postContrat(contrat).subscribe(
      (res: any) => {
        this.lst = res;
      },
      err => {
        console.log(err);
      },
    )
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}
