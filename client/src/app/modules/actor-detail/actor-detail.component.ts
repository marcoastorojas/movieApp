import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  public info: any

  ngOnInit(): void {
    
    this.route.params.subscribe(data => {
      const id = data.id
      this.http.get(`http://localhost:3001/actor/${id}`)
      .subscribe((data: any) => {
          if (data.ok) {
            this.info = data.actor
          }
        })
    })
  }

}
