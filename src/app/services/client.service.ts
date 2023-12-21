import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../types/client';
import { RequestParams } from '../types/common';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly clientsApiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsApiUrl, client);
  }

  listClients(requestParams?: RequestParams): Observable<Client[]> {
    const itensPerPage = 10;
    let params = new HttpParams();
    //   .set('_page', page)
    //   .set('_limit', itensPerPage);

    if (requestParams) {
      params = params
        .set('_page', requestParams._page)
        .set('_limit', itensPerPage);
      if (requestParams.filter && requestParams.filter?.trim().length > 0) {
        params = params.set('q', requestParams.filter);
      }
    }

    return this.http.get<Client[]>(this.clientsApiUrl, { params });
  }

  getClientById(id: string): Observable<Client> {
    const url = `${this.clientsApiUrl}/${id}`;

    return this.http.get<Client>(url);
  }

  editClient(client: Client): Observable<Client> {
    const url = `${this.clientsApiUrl}/${client.id}`;

    return this.http.put<Client>(url, client);
  }

  deleteClient(id: string): Observable<Client> {
    const url = `${this.clientsApiUrl}/${id}`;

    return this.http.delete<Client>(url);
  }
}
