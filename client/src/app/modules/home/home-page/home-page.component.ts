import { Component, OnInit } from '@angular/core';
import { UserDb } from '../../auth/interfaces/ResponseAuth';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private authService:AuthService) {
    if(localStorage.getItem("token")){
      
    }
   }

  ngOnInit(): void {
  }
  get user(){
    return this.authService.userDb  
  }
}
