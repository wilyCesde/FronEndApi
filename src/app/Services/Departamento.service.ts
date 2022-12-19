import { Injectable } from '@angular/core';

//importamos esto:

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Departamento } from '../Interfaces/Departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
//vamos a importar nuestras variables

  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "departamento/";

  constructor(private http:HttpClient) { }

  getList(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}lista`);
    }

}
