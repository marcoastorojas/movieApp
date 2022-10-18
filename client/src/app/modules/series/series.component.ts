import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  constructor(private http: HttpClient) { }
  series: any = []

  ngOnInit(): void {
    this.http.get("http://localhost:3001/serie/")
      .subscribe((data: any) => this.series = data.results)
  }

}
