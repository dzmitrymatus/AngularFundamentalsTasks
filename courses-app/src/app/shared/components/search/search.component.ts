import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() inputPlaceholder: string = "";
  @Output() onClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue: any) {
    console.log(formValue.searchValue);
    if(formValue.searchValue) {
      this.onClick.emit(formValue.searchValue);
    }
  }

}
