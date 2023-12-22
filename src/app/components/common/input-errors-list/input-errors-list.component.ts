import { Component, Input } from '@angular/core';
import { ErrorWrapper } from '../../../types/common';

@Component({
  selector: 'app-input-errors-list',
  templateUrl: './input-errors-list.component.html',
  styleUrl: './input-errors-list.component.scss',
})
export class InputErrorsListComponent {
  @Input() errorsMessagesList: ErrorWrapper[] = [];
}
