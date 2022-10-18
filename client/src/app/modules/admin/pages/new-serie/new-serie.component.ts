import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Actor, AdminService, Category } from '../../services/admin.service';

@Component({
  selector: 'app-new-serie',
  templateUrl: './new-serie.component.html',
  styleUrls: ['./new-serie.component.css']
})
export class NewSerieComponent implements OnInit {
  constructor(private fb: FormBuilder, private adminService: AdminService) { }
  actors: Actor[] = []
  categories: Category[] = []
  public formSerie = this.fb.group({
    title: ["", {
      validators: [Validators.required],
      asyncValidators: [this.customValidatorSerie()],
      updateOn: 'blur'
    }],
    image: ["", {
      validators: [Validators.required]
    }],
    overview: ["", {
      validators: [Validators.required]
    }]
  })

  get actorsAvailable() { return this.adminService.actorsAvailables }
  get categoriesAvailables() { return this.adminService.categories }
  ngOnInit(): void {
  }
  postSerie() {
    if (this.formSerie.invalid || !this.actors.length || !this.categories.length) return console.log("invalid form")
    const newSerie = {
      ...this.formSerie.value,
      actorsId: this.actors.map(actor => actor.id),
      categoriesId: this.categories.map(category => category.id)
    }
    this.adminService.postSerie(newSerie)
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
  deleteActor(id: string) {
    this.actors = this.actors.filter(actor => actor.id !== id)
  }
  searchActor(query: string) {
    this.adminService.getActorsByName(query)
      .subscribe(console.log)
  }
  customValidatorSerie() {
    return (control: AbstractControl) => {
      const value = control.value;
      return this.adminService.isAvailableTitleSerie(value)
        .pipe(
          tap(console.log),
          map(isAvailable => isAvailable ? null : { isNotAvailable: true })
        )
    }
  }

}
