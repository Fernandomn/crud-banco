import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonStyle, ButtonWidth } from '../../../types/style-types';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() buttonWidth: ButtonWidth = 'content';
  @Input() buttonStyle: ButtonStyle = 'primary';

  @Output() onClickEmitter = new EventEmitter();

  onButtonClick(): void {
    this.onClickEmitter.emit();
  }

  getButtonClass(): string {
    return `button ${this.buttonStyle} ${this.buttonWidth}`;
  }
}
