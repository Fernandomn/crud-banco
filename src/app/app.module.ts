import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsListComponent,
    ClientsFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
