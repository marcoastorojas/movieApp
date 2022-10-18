import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }
  @ViewChild("referencia") x! :any  
  get name(){
    return this.authService.userDb.name
  }
  logout(){
    localStorage.removeItem("token")
  }

  ngOnInit(): void {
  }

}
