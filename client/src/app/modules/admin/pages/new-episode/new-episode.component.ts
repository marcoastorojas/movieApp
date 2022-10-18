import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-new-episode',
  templateUrl: './new-episode.component.html',
  styleUrls: ['./new-episode.component.css']
})
export class NewEpisodeComponent {
  constructor(private adminService: AdminService, private fb: FormBuilder) { }
  @ViewChild('toggle') toggle: ElementRef<HTMLFormElement>
  public serieSelected: any
  public numberSeasons: number = 0
  searchSerie(query: string) {
    this.adminService.getSeriesByName(query)
      .subscribe(console.log)
  }
  getDataSerie(idSerie: string) {
    this.adminService.getDataSere(idSerie)
      .subscribe((data: any) => {
        console.log(data);
        this.serieSelected = data.serie
        console.log(this.serieSelected.seasons)
        this.numberSeasons = data.serie.seasons.length
      })
  }
  createNewSeason() {
    const bodyPostSeason = { season_number: this.numberSeasons + 1 }
    this.adminService.postSeason(this.serieSelected.id, bodyPostSeason)
      .subscribe(() => {
        this.getDataSerie(this.serieSelected.id)
      })
    this.numberSeasons += 1
  }
  createEpisode(seasonId: string, bodyNewEpisode: any) {
    this.adminService.postChapter(bodyNewEpisode, seasonId)
      .subscribe((data: any) => {
        console.log(data);
        if (data.ok) {
          this.getDataSerie(this.serieSelected.id)
        }
      })

  }
  toggleForm(): void {
    const formulario = this.toggle.nativeElement.classList
    if (formulario.contains("hide")) {
      this.toggle.nativeElement.classList.replace("hide", "show")
      return
    }
    this.toggle.nativeElement.classList.replace("show", "hide")
  }
  get series(): any { return this.adminService.series }
}
