export interface Client {
  id: string;
  clientName: string;
  cpf: string;
  birthDate: Date;
  monthlyIncome: number;
  email: string;
  registrationDate: Date;
}

export interface ClientListPages {
  first: number;
  prev?: number;
  next?: number;
  last: number;
}
