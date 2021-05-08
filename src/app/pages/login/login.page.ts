import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Login } from 'src/app/_models/login';
import { ApiService } from 'src/app/_services/login/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    if (localStorage.getItem('token') != null) {
      this.navCtrl.navigateRoot('/home-results');
    }

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: false,
                color: 'danger',
                message: 'Email ou mot de passe incorrect',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }



  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

  async login() {
    let user = new Login();
    user.EMAIL = this.onLoginForm.get('email').value;
    user.MOTDEPASSE = this.onLoginForm.get('password').value;


    this.api.login(user).subscribe(

      (res: any) => {
        localStorage.setItem('token', res.token);
        this.navCtrl.navigateRoot('/home-results');
        this.onLoginForm.reset();

      },
      async err => {
        if (err.status == 404) {
          const toast = await this.toastCtrl.create({
            showCloseButton: false,
            color: 'danger',
            message: 'Email ou mot de passe incorrect',
            duration: 3000,
            position: 'bottom'
          });

          toast.present();
        }
        else {
          const toast = await this.toastCtrl.create({
            showCloseButton: true,
            closeButtonText: "Fermer",
            color: 'danger',
            message: 'Erreur de connexion !!',
            position: 'bottom'
          });

          toast.present();
        }

        console.log(err);

      }

    );




  }

}