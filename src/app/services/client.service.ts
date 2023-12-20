import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API = 'http://localhost:3000/pensamentos'

  constructor(private http:HttpClient) { }
}
