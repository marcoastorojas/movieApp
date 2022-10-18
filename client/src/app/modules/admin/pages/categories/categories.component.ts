import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  categoryForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    color: ["", Validators.required],
  })
  postCategory() {
    if (this.categoryForm.invalid) { return console.log("form invalid") }
    console.log("form works")
    this.adminService.postCategory(this.categoryForm.value)
      .subscribe()
  }
  ngOnInit(): void {
  }
  get categories() {
    return this.adminService.categories
  }

}
