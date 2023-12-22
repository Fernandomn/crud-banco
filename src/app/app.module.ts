import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { AlertModalComponent } from './components/common/alert-modal/alert-modal.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CardComponent } from './components/common/card/card.component';
import { PaginatorComponent } from './components/common/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsListComponent,
    ClientsFormComponent,
    HeaderComponent,
    AlertModalComponent,
    CardComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
