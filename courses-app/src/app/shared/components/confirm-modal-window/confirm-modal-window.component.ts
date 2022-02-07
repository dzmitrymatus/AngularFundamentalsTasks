import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal-window',
  templateUrl: './confirm-modal-window.component.html',
  styleUrls: ['./confirm-modal-window.component.css']
})
export class ConfirmModalWindowComponent implements OnInit {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() okButtonText: string = "Ok";
  @Input() cancelButtonText: string = "Cancel";
  @Output() onClose = new EventEmitter<boolean>();

  visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show(){
    this.visible = true;
  }

  hide(){
    this.visible = false;
  }

}
