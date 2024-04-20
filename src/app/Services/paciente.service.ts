import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { Paciente } from '../Interfaces/paciente';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private endpoint:string=environment.endPoint;
  private apiUrl:string=this.endpoint + "paciente";
  constructor(private http:HttpClient) { }

getList():Observable<Paciente>{
  return this.http.get<Paciente>(`${this.apiUrl}lista`);
  
}

add(modelo:Paciente):Observable<Paciente>{
  return this.http.post<Paciente>(`${this.apiUrl}guardar/`,modelo);
}
update(idPaciente:number,modelo:Paciente):Observable<Paciente>{
  return this.http.put<Paciente>(`${this.apiUrl}actualizar/${idPaciente}`,modelo);
}
delete(idPaciente:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}eliminar/${idPaciente}`);
}

}
