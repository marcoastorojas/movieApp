import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate:[HomeGuard],
    canLoad:[HomeGuard]
  },
  {
    path: "**", redirectTo: "auth", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
