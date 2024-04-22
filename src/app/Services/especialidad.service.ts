import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { Especialidad } from '../Interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

private endpoint:string=environment.endPoint;
private apiUrl:string=this.endpoint + "especialidad/";



  constructor(private http:HttpClient) { }
getList():Observable<Especialidad[]>{
  return this.http.get<Especialidad[]>(`${this.apiUrl}lista`);
  
}

}