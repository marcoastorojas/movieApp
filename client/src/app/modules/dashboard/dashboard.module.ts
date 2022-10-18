import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InformationComponent } from './pages/information/information.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SuscriptionComponent } from './pages/suscription/suscription.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InformationComponent,
    FavoritesComponent,
    SuscriptionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
