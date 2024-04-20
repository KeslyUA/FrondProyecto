
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

//implementar interfats
import { Paciente } from './Interfaces/paciente';
import { PacienteService } from './Services/paciente.service';
import { MatDialogModule } from '@angular/material/dialog';
//import { DialogsAddEditComponent } from './Dialogs/dialogs-add-edit/dialogs-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['NombreCompleto', 'Especialidad', 'Telefono', 'FechaCita','Acciones'];
  dataSource = new MatTableDataSource<Paciente>();
  constructor(private _pacienteServicio:PacienteService,
  public dialog: MatDialogModule
   ) {

  }

  ngOnInit(): void {
      
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  mostrarPaciente(){
    this._pacienteServicio.getList().subscribe({
      next:(dataRespons) =>{console.log(dataRespons)this.dataSource.data=dataRespons ; },error:(e) =>{}          
    
    }

      
    )
  }
  
  dialogoNuevoEmpleado() {
    this.dialog.open( DialogsAddEditComponent,{
    disableClose:true,
    width:"350px"
  })
.afterClosed().subscribe(resultado =>{
 if (resultado ==="creado"){
  this.mostrarPaciente();
 }
})

  }
  
  dialogoEditEmpleado(dataPaciente:Paciente) {
    this.dialog.open( DialogsAddEditComponent,{
    disableClose:true,
    width:"350px"
    data:dataPaciente
  })
.afterClosed().subscribe(resultado =>{
 if (resultado ==="editado"){
  this.mostrarPaciente();
 }
})

  }


}


