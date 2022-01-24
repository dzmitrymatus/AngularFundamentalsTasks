import { Component, Input, OnInit } from '@angular/core';
import { IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string = "";
  @Input() iconName: IconName | undefined = undefined;
  @Input() iconPrefix: IconPrefix = 'fas';
  iconLookup:IconLookup| undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    if(this.iconName){
      this.iconLookup = {prefix: this.iconPrefix, iconName: this.iconName};
    }
   }

}
