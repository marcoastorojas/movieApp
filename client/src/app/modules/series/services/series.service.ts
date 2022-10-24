import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  series: any = []
  constructor(private http: HttpClient) {
    this.http.get("http://localhost:3001/serie/")
      .subscribe((data: any) => this.series = data.results)
  }
}
