import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client';
import { ErrorWrapper } from '../../types/common';
import {
  ageValidator,
  cpfValidator,
  todayOrPastDateValidator,
} from '../../validators/form-validators';
import { AlertModalComponent } from '../common/alert-modal/alert-modal.component';

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
  cpfMask = '000.000.000-00';
  form!: FormGroup;

  private $onDestroy = new Subject<boolean>();

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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
          .subscribe((createClientResult: Client) => {
            console.log('createClientResult', createClientResult);

            this.infoAndRouteToMainPage();
          });
      } else {
        this.clientService
          .editClient({ ...this.form.value, id: this.client.id })
          .pipe(takeUntil(this.$onDestroy))
          .subscribe((updateClientResult: Client) => {
            console.log('updateClientResult', updateClientResult);

            this.infoAndRouteToMainPage();
          });
      }
    }
  }

  getClientNameErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'Nome Cliente é obrigatório',
        shouldDisplayError:
          this.form.get('clientName')?.errors?.['required'] &&
          this.form.get('clientName')?.touched,
      },
      {
        errorMessage: 'Nome Cliente deve possuir ao menos um sobrenome',
        shouldDisplayError:
          this.form.get('clientName')?.errors?.['pattern'] &&
          this.form.get('clientName')?.touched,
      },
    ];
  }

  getCpfErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'CPF é obrigatório',
        shouldDisplayError:
          this.form.get('cpf')?.errors?.['required'] &&
          this.form.get('cpf')?.touched,
      },
      {
        errorMessage: 'CPF deve ter no máximo 11 caracteres',
        shouldDisplayError:
          this.form.get('cpf')?.errors?.['maxlength'] &&
          this.form.get('cpf')?.touched,
      },
      {
        errorMessage: 'CPF está em formato inválido',
        shouldDisplayError:
          this.form.get('cpf')?.errors?.['invalidCpf'] &&
          this.form.get('cpf')?.touched,
      },
    ];
  }
  getBirthDateErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'Data Nascimento é obrigatória',
        shouldDisplayError:
          this.form.get('birthDate')?.errors?.['required'] &&
          this.form.get('birthDate')?.touched,
      },
      {
        errorMessage: 'O Cliente deve ter mais de 18 anos, e menos de 60',
        shouldDisplayError:
          this.form.get('birthDate')?.errors?.['invalidAge'] &&
          this.form.get('birthDate')?.touched,
      },
    ];
  }

  getMonthlyIncomeErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'Renda Mensal é obrigatória',
        shouldDisplayError:
          this.form.get('monthlyIncome')?.errors?.['required'] &&
          this.form.get('monthlyIncome')?.touched,
      },
    ];
  }
  getEmailErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'E-mail é obrigatório',
        shouldDisplayError:
          this.form.get('email')?.errors?.['required'] &&
          this.form.get('email')?.touched,
      },
      {
        errorMessage: 'Formato de e-mail incorreto',
        shouldDisplayError:
          this.form.get('email')?.errors?.['email'] &&
          this.form.get('email')?.touched,
      },
    ];
  }
  getRegistrationDateErrors(): ErrorWrapper[] {
    return [
      {
        errorMessage: 'Data Cadastro é obrigatória',
        shouldDisplayError:
          this.form.get('registrationDate')?.errors?.['required'] &&
          this.form.get('registrationDate')?.touched,
      },
      {
        errorMessage: 'Data Cadastro deve ser a data de hoje, ou anterior',
        shouldDisplayError:
          this.form.get('registrationDate')?.errors?.['futureDate'] &&
          this.form.get('registrationDate')?.touched,
      },
    ];
  }

  private infoAndRouteToMainPage() {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: {
        modalIcon: 'circle-tick',
        enableCancel: false,
        text: `Cliente salvo com sucesso!`,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => this.router.navigate(['/list-clients']));
  }

  private createForm() {
    this.form = this.formBuilder.group({
      clientName: [
        this.client.clientName,
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+\s\w+/),
        ]),
      ],
      cpf: [
        { value: this.client.cpf, disabled: !this.isCreatingClient },
        Validators.compose([
          Validators.required,
          Validators.maxLength(11),
          cpfValidator,
        ]),
      ],
      birthDate: [
        this.client.birthDate,
        Validators.compose([Validators.required, ageValidator]),
      ],
      monthlyIncome: [this.client.monthlyIncome, Validators.compose([])],
      email: [
        this.client.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
      registrationDate: [
        this.client.registrationDate,
        Validators.compose([Validators.required, todayOrPastDateValidator]),
      ],
    });
  }
}
