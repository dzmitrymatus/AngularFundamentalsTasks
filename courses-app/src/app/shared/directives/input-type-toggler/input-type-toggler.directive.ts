import { ComponentRef, Directive, ElementRef, Input, Type, ViewContainerRef } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

@Directive({
  selector: 'input[appInputTypeToggler]',
  exportAs: 'inputTypeToggler'
})
export class InputTypeTogglerDirective {
  @Input() inputType: string = 'text';
  iconComponent: ComponentRef<FaIconComponent>;

  constructor(private inputElement: ElementRef, private renderer: ViewContainerRef) {

    this.iconComponent = renderer.createComponent<FaIconComponent>(FaIconComponent);
    this.iconComponent.instance.icon = {prefix: 'fas', iconName: this.getIconName()};  
    this.iconComponent.instance.render();
    this.iconComponent.location.nativeElement.addEventListener("click", () => this.onIconClick());
    this.iconComponent.location.nativeElement.style.position = "relative";
    this.iconComponent.location.nativeElement.style.left = '-22px';
    this.iconComponent.location.nativeElement.style.top = '1px';
   }

  getIconName() : IconName {
      if (this.inputType === "text"){
        return 'eye-slash';
      } else {
      return 'eye';
    }
  }

  onIconClick() {
      if(this.inputType === 'text') {
        this.inputType = 'password';
      } else {
        this.inputType = 'text'
      }
      
      this.iconComponent.instance.icon = {prefix: 'fas', iconName: this.getIconName()};
      this.iconComponent.instance.render();
  }
}

