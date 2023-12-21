import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit, OnDestroy {
  clientsList: Client[] = [];
  filter: string = '';

  private currentPage = 1;
  private $onDestroy = new Subject<boolean>();

  constructor(private clientService: ClientService, private router: Router) {
    this.$onDestroy.next(false);
  }

  ngOnInit(): void {
    this.loadMoreClients();
  }

  ngOnDestroy(): void {
    this.$onDestroy.next(true);
    this.$onDestroy.complete();
  }

  gotToUpdateClient(client: Client): void {
    this.router.navigate([`/edit-clients/${client.id}`]);
  }

  private loadMoreClients(): void {
    this.clientService
      .listClients({ _page: this.currentPage++, filter: this.filter })
      .pipe(takeUntil(this.$onDestroy))
      .subscribe({
        next: (clientsListResult: Client[]) => {
          this.clientsList = [...clientsListResult];
        },
        error: (error) => console.error('Loading data error:', error),
      });
  }
}
