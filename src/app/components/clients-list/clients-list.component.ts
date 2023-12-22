import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client';
import { AlertModalComponent } from '../common/alert-modal/alert-modal.component';

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

  constructor(
    private clientService: ClientService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.$onDestroy.next(false);
  }

  ngOnInit(): void {
    this.loadClientsList();
  }

  ngOnDestroy(): void {
    this.$onDestroy.next(true);
    this.$onDestroy.complete();
  }

  loadClientsList(): void {
    this.clientService
      .listClients({ _page: this.currentPage, filter: this.filter })
      .pipe(takeUntil(this.$onDestroy))
      .subscribe({
        next: (clientsListResult: Client[]) => {
          console.log('clientsListResult', clientsListResult);

          this.clientsList = [...clientsListResult];
        },
        error: (error) => console.error('Loading data error:', error),
      });
  }

  goToUpdateClient(client: Client): void {
    this.router.navigate([`/edit-clients/${client.id}`]);
  }

  removeClient(client: Client) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      maxWidth: '400px',
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
            console.log('deleteResult', deleteResult)
            if (deleteResult) {
              this.dialog.open(AlertModalComponent, {
                data: {
                  modalIcon: 'circle-tick',
                  enableCancel: false,
                  text: `Usuário removido com sucesso!`,
                },
              });
              this.clientsList = this.clientsList.filter(
                (item) => item.id !== client.id
              );
            }
          });
      }
    });
  }
}
