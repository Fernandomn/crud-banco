import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientListPages } from '../../../types/client';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() pagesList: number[] = [];
  @Input() currentPage: number = 0;

  @Output() pageClicked: EventEmitter<number> = new EventEmitter<number>();

  onPageButtonClicked(page: number): void {
    this.pageClicked.emit(page);
  }

  getInfoClass(page: number): string {
    return page !== this.currentPage ? 'info' : '';
  }
}
