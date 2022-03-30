import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { ConfirmModalWindowComponent } from '../confirm-modal-window/confirm-modal-window.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string = "";
  @Input() buttonType: string = "button";
  @Input() iconName: IconName | undefined = undefined;
  @Input() iconPrefix: IconPrefix = 'fas';
  @Input() confirmWindow: ConfirmModalWindowComponent | undefined = undefined;
  @Output() onClick = new EventEmitter<void>();

  iconLookup:IconLookup| undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    if(this.iconName){
      this.iconLookup = {prefix: this.iconPrefix, iconName: this.iconName};
    }

    if(this.confirmWindow){
      this.confirmWindow.onClose.subscribe(x => 
        {
          if(x) this.onClick.emit();
          this.confirmWindow?.hide();
        });
    } 
   }

  onButtonClick() {
    if(this.confirmWindow) {
      this.confirmWindow.show();    
    } else {
      this.onClick.emit();
    }
  }
}
