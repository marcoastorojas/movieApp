import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface FormEpisode {
  name: string,
  nEpisode: number
}

@Component({
  selector: 'app-form-episode',
  templateUrl: './form-episode.component.html',
  styleUrls: ['./form-episode.component.css']
})
export class FormEpisodeComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  @Input("listEpisodes") listEpisodes: any
  @Output("episodeForm") episodeForm: EventEmitter<FormEpisode> = new EventEmitter
  public formEpisode: FormGroup
  ngOnInit(): void {
    const lastEpisode = !this.listEpisodes.length ? 0 : this.listEpisodes.reduce((prev: any, cur: any) => {
      return prev.chapter_number > cur.chapter_number ? prev : cur
    }, 0).chapter_number
    
    this.formEpisode = this.fb.group({
      name: ["", Validators.required],
      chapter_number: [lastEpisode + 1, Validators.required]
    })
  }
  sendEpisodeBody() {
    console.log("enviando el formulario");
    this.episodeForm.emit(this.formEpisode.value)
  }

}
