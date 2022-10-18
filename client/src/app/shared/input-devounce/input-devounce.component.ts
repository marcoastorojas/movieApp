import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-devounce',
  templateUrl: './input-devounce.component.html',
  styleUrls: ['./input-devounce.component.css']
})
export class InputDevounceComponent implements OnInit {

  @Input() placeholder: string = ""
  @Output('ondebouncer') ondebouncer = new EventEmitter<string>()
  private debouncer: Subject<string> = new Subject


  constructor() { }
  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.ondebouncer.emit(value)
      }
      )
  }

  keyup(value: string = "") {
    if (value.length <= 3) return
    this.debouncer.next(value)
  }
}
