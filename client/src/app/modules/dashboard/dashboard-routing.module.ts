import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { InformationComponent } from './pages/information/information.component';
import { SuscriptionComponent } from './pages/suscription/suscription.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "favorites", component: FavoritesComponent },
      { path: "information", component: InformationComponent },
      { path: "suscription", component: SuscriptionComponent },
      { path: "**", redirectTo: "information", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
