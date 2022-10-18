import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService:AdminService) { }

  actorForm: FormGroup = this.fb.group({
    image: ["", [Validators.required]],
    name: ["", [Validators.required]],
  })

  ngOnInit(): void {
  }

  postUser() {
    this.actorForm.markAllAsTouched()
    if (this.actorForm.invalid) return
    this.adminService.postActor(this.actorForm.value)
      .subscribe()
  }

  validateInput(value: string) {
    return this.actorForm.controls[value].touched && this.actorForm.controls[value].errors
  }
  get actors(){return this.adminService.actors}
}
