import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-clients', pathMatch: 'full' },
  { path: 'list-clients', component: ClientsListComponent },
  { path: 'create-clients', component: ClientsFormComponent },
  { path: 'edit-clients/:id', component: ClientsFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
