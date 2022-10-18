import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeRoutingModule } from '../modules/home/home-routing.module';
import { InputDevounceComponent } from './input-devounce/input-devounce.component';



@NgModule({
  declarations: [
    NavbarComponent,
    InputDevounceComponent
  ],
  exports:[
    NavbarComponent,
    InputDevounceComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class SharedModule { }
