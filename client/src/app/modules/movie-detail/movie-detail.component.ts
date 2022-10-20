import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  info: any
  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const id = data.id
      this.http.get(`http://localhost:3001/movie/${id}`)
        .subscribe((data:any)=>{
          if(data.ok){
            this.info= data.movie
          }
        })
    })
  }

}
