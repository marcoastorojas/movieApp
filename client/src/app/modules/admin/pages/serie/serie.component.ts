import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Actor, AdminService, Category } from '../../services/admin.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent {
  constructor(private adminService: AdminService, private fb: FormBuilder) { }
  actors: Actor[] = []
  categories: Category[] = []
  formMovie = this.fb.group({
    title: [
      "",
      {
        validators: [Validators.required],
        asyncValidators: [this.customValidatorMovie()],
        updateOn: 'blur'
      },
    ],
    image: ["", { validators: [Validators.required] }],
    overview: ["", { validators: [Validators.required] }]
  })
  postMovie() {
    if (this.formMovie.invalid || !this.actors.length || !this.categories.length) return console.log("form incorrecto")
    const newMovie = {
      ...this.formMovie.value,
      actorsId: this.actors.map(actor => actor.id),
      categoriesId: this.categories.map(category => category.id)
    }
    this.adminService.postMovie(newMovie)
      .subscribe(console.log)
  }
  searchActor(query: string) {
    this.adminService.getActorsByName(query)
      .subscribe(console.log)
  }
  addActor(id: string) {
    const actorToAdd = this.actorsAvailable.find(actor => actor.id === id)
    if (this.actors.find(actor => actorToAdd!.id === actor.id)) return (
      console.log("actor is already added")
    )
    this.actors.unshift(actorToAdd!)
  }
  addCategory(id: string) {
    const categoryToAdd = this.categoriesAvailables.find(category => category.id === id)
    if (this.categories.find(category => categoryToAdd!.id === category.id)) return (
      console.log("category is already added")
    )
    this.categories.unshift(categoryToAdd!)
  }
  customValidatorMovie() {
    return (control: AbstractControl) => {
      const value = control.value;
      return this.adminService.isAvailableTitleMovie(value)
        .pipe(map(isAvailable => isAvailable ? null : { isNotAvailable: true }))
    }
  }
  get actorsAvailable() {
    return this.adminService.actorsAvailables
  }
  get categoriesAvailables() {
    return this.adminService.categories
  }
  seeData(data: any) {
    console.log(data)
  }

}
