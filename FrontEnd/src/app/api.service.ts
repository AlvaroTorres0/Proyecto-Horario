import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url;

  constructor(private _http:HttpClient) { 
    this.url = "http://localhost:3000";
  }
  
  consultarAlumno = (id:any) =>{
    let url = `${this.url}/datos/alumno/${id}`;
    return this._http.get(url);
  }

  consultarDocente = (id:any) =>{
    let url = `${this.url}/datos/docente/${id}`;
    return this._http.get(url);
  }

  localizarAlumno = (id:any) =>{
    let url = `${this.url}/buscar/alumno/${id}`;
    return this._http.get(url);
  }

  localizarDocente = (id:any,) =>{
    let url = `${this.url}/buscar/docente/${id}`;
    return this._http.get(url);
  }
}