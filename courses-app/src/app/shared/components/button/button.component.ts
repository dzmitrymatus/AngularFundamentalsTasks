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
  @Input() iconName: IconName | undefined = undefined;
  @Input() iconPrefix: IconPrefix = 'fas';
  @Input() confirmWindow: ConfirmModalWindowComponent | undefined;
  @Output() onClick = new EventEmitter<void>();;

  iconLookup:IconLookup| undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    if(this.iconName){
      this.iconLookup = {prefix: this.iconPrefix, iconName: this.iconName};
    }
   }

   onButtonClick() {
      if(this.confirmWindow !== undefined){
        this.confirmWindow.show();
        this.confirmWindow.onClose.subscribe(x => 
          {
            if(x === true) this.onClick.emit();
            this.confirmWindow?.hide();
          });
      }
   }

}
