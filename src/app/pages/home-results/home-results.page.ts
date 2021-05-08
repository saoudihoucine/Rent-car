import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';

import {
  BarcodeScannerOptions, BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";


import { ApiService } from 'src/app/_services/vehicule/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { vehicule } from 'src/app/_models/vehicule';


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {

  barcodeScannerOptions: BarcodeScannerOptions;
  matricule: any;
  vehicule: any;
  openMenu: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private apiVehicule: ApiService,
    private sanitizer: DomSanitizer) {

    this.scanCode()

  }



  changeEtat(ETAT, mat) {
    const vh = new vehicule();
    vh.MATRICULE = mat;
    vh.ETAT = ETAT;

    this.apiVehicule.updateVehicule(vh).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({
          showCloseButton: false,
          color: 'success',
          message: "Modification aves succès",
          duration: 3000,
          position: 'bottom'
        });

        toast.present();

      },
      async err => {
        const toast = await this.toastCtrl.create({
          showCloseButton: false,
          color: 'danger',
          message: err.error.message,
          duration: 3000,
          position: 'bottom'
        });

        toast.present();

      },
    )


  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  getVehicule(matricule) {
    this.apiVehicule.getVehicule(matricule).subscribe(
      (res: any) => {
        this.vehicule = res;
      },
      async err => {
        console.log(err);
        this.vehicule = undefined
        const toast = await this.toastCtrl.create({
          showCloseButton: false,
          color: 'danger',
          message: err.error.message,
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
      },
    )
  }

  transform(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }


  scanCode() {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      prompt: "Please scan"
    }
    this.barcodeScanner.scan(this.barcodeScannerOptions).then(barcodeData => {
      this.getVehicule(barcodeData.text)
      this.matricule = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });

  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/');
  }
}
