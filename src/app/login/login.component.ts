import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'app/_models/login';
import { ApiService } from 'app/_services/employes/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static role = '';
  constructor(private api: ApiService, private route: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.route.navigateByUrl('/dashboard');
  }

  static getRole(): any {
    return this.role;
  }

  onSubmit(form) {

    let login = new Login();
    login.EMAIL = form.value.Email;
    login.MOTDEPASSE = form.value.password;

    this.api.login(login).subscribe(

      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        this.route.navigateByUrl('/dashboard')
        form.reset();

      },
      err => {
        if (err.status == 404) {
          this.toastrService.error('Email ou mot de passe inccorect', 'Utilisateur non trouvé');
        }
        else
          console.log(err);

      }

    );
  }

} 
