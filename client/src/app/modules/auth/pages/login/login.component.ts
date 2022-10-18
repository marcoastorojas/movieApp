import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthUser from '../../interfaces/AuthUser';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account: AuthUser = {
    email: "",
    password: ""
  }
  loading: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router) { }
  ngOnInit(): void {
  }

  handleSubmit() {
    this.loading = true
    this.authService.auth("/login", this.account)
      .subscribe((ok) => {
        if (ok === true) {
          Swal.fire({
            icon: 'success',
            text: 'Bienvenido!',
            timer: 1500
          })
          this.router.navigateByUrl("/")
        } else {
          Swal.fire(
            'Error',
            ok.error.message,
            'error'
          )
        }
        this.loading = false
      })
  }
  ver() {
    // console.log(this.authService.getUser())
  }


}
