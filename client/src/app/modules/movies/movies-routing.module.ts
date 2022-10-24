import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { ByCategoryComponent } from './pages/by-category/by-category.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

const routes: Routes = [
  {
    path: "",
    component: MoviesComponent,
    children: [
      { path: "all", component: MoviesPageComponent },
      { path: ":id", component: ByCategoryComponent },
      { path:"**", redirectTo:"all" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
