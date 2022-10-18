import { Component, OnInit } from '@angular/core';
import AuthUser from '../../interfaces/AuthUser';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account: AuthUser = {
    email: "",
    password: "",
    name: ""
  }
  loading: boolean = false
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  handleSubmit() {
    this.loading = true
    this.authService.auth("/", this.account)
      .subscribe((res) => {
        if (res === true) {
          Swal.fire({
            icon: 'success',
            text: 'Registrado exitosamente!',
            timer: 1500
          })
          this.router.navigateByUrl("/")
        } else {
          Swal.fire(
            'Error',
            JSON.stringify(res.error.message),
            'error'
          )
        }
        this.loading = false
      })
  }

} 
