import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrl: './clients-form.component.scss',
})
export class ClientsFormComponent implements OnInit, OnDestroy {
  client: Client = {
    id: '',
    clientName: '',
    cpf: '',
    birthDate: new Date(),
    monthlyIncome: 0,
    email: '',
    registrationDate: new Date(),
  };

  form!: FormGroup;

  private $onDestroy = new Subject<boolean>();

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.$onDestroy.next(false);
  }

  get isCreatingClient(): boolean {
    return !this.client.id;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService
        .getClientById(id)
        .pipe(takeUntil(this.$onDestroy))
        .subscribe((client: Client) => {
          this.client = client;
          this.createForm();
        });
    } else {
      this.createForm();
    }
  }

  ngOnDestroy(): void {
    this.$onDestroy.next(true);
    this.$onDestroy.complete();
  }

  saveClient() {
    if (this.form.valid) {
      if (!this.client.id) {
        this.clientService
          .createClient({ ...this.form.value, id: uuidv4() })
          .pipe(takeUntil(this.$onDestroy))
          .subscribe((result) => {
            console.log(result);
            alert('cliente salvo!');
            // abrir modal de confirmação, e navegar para tela inicial
            this.router.navigate(['/list-clients']);
          });
      } else {
        this.clientService
          .editClient({ ...this.form.value, id: this.client.id })
          .pipe(takeUntil(this.$onDestroy))
          .subscribe((result) => {
            console.log(result);
            alert('cliente salvo!');
            // abrir modal de confirmação, e navegar para tela inicial
            this.router.navigate(['/list-clients']);
          });
      }
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      clientName: [
        this.client.clientName,
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      cpf: [this.client.cpf, Validators.compose([Validators.required])],
      birthDate: [
        this.client.birthDate,
        Validators.compose([Validators.required]),
      ],
      monthlyIncome: [this.client.monthlyIncome, Validators.compose([])],
      email: [
        this.client.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      registrationDate: [
        this.client.registrationDate,
        Validators.compose([Validators.required]),
      ],
    });
  }
}
