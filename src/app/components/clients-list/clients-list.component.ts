import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { Client, ClientListPages } from '../../types/client';
import { TableHeader } from '../../types/common';
import { parseLinkHeaderPages } from '../../utils/utils';
import { AlertModalComponent } from '../common/alert-modal/alert-modal.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit, OnDestroy {
  clientsList: Client[] = [];
  filter: string = '';
  currentPage = 1;
  pagesList: number[] = [];
  headersList: TableHeader[] = [
    { key: 'clientName', name: 'Nome Cliente' },
    { key: 'cpf', name: 'CPF' },
    { key: 'birthDate', name: 'Data Nascimento' },
    { key: 'monthlyIncome', name: 'Renda Mensal' },
    { key: 'actions', name: '' },
  ];

  private $onDestroy = new Subject<boolean>();

  constructor(
    private clientService: ClientService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.$onDestroy.next(false);
  }

  ngOnInit(): void {
    this.loadClientsList(this.currentPage);
  }

  ngOnDestroy(): void {
    this.$onDestroy.next(true);
    this.$onDestroy.complete();
  }

  loadClientsList(page: number): void {
    this.currentPage = page;

    this.clientService
      .listClients({
        _page: page,
        filter: this.filter,
        tableHeaders: this.headersList,
      })
      .pipe(takeUntil(this.$onDestroy))
      .subscribe({
        next: (clientsListResult: HttpResponse<Client[]>) => {
          const headerLink = clientsListResult.headers.get('Link');

          let clientListPages: ClientListPages = { first: 1, last: 1 };
          if (headerLink) {
            clientListPages = parseLinkHeaderPages(headerLink);
          }
          this.pagesList = this.createPagesList(clientListPages);

          this.clientsList = clientsListResult.body || [];
        },
        error: (error) => console.error('Loading data error:', error),
      });
  }

  goToUpdateClient(client: Client): void {
    this.router.navigate([`/edit-clients/${client.id}`]);
  }

  removeClient(client: Client) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        modalIcon: 'circle-alert',
        enableCancel: true,
        text: `Deseja realmente remover o usuário ${client.clientName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((modalResult) => {
      if (modalResult) {
        this.clientService
          .deleteClient(client.id)
          .pipe(takeUntil(this.$onDestroy))
          .subscribe((deleteResult) => {
            if (deleteResult) {
              this.dialog.open(AlertModalComponent, {
                data: {
                  modalIcon: 'circle-tick',
                  enableCancel: false,
                  text: `Usuário removido com sucesso!`,
                },
              });
              this.loadClientsList(this.currentPage);
            }
          });
      }
    });
  }

  onPageClicked(page: number): void {
    this.loadClientsList(page);
  }

  searchWithFilter(): void {
    this.loadClientsList(1);
  }

  sortingTable(header: TableHeader): void {
    if (header.key === 'actions') return;

    header.sort = !header.sort
      ? 'asc'
      : header.sort === 'asc'
      ? 'desc'
      : undefined;
    this.loadClientsList(1);
  }

  private createPagesList(clientListPages: ClientListPages): number[] {
    const pagesList = Object.values(clientListPages);
    pagesList.push(this.currentPage);

    return [...new Set(pagesList.sort())];
  }
}
