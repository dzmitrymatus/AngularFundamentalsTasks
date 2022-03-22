import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() inputPlaceholder: string = "";
  @Output() onClick = new EventEmitter<string>();

  searchValue: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.searchValue) {
      this.onClick.emit(this.searchValue);
    }
  }

}
