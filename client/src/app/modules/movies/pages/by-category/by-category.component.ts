import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private moviesServices:MoviesService,
    private authService:AuthService) { }
  movies:any=[]
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => { 
      this.moviesServices.getMoviesByCategory(id)
        .subscribe((data:any)=>{
          this.movies = data.results
        })
    })
  }
  addFavorite(){
    
  }
}
