
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DialogsAddEditComponent } from './Dialogs/dialogs-add-edit/dialogs-add-edit.component';

//implementar interfats
import { Paciente } from './Interfaces/paciente';
import { PacienteService } from './Services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['NombreCompleto', 'Especialidad', 'Telefono', 'FechaCita','Acciones'];
  dataSource = new MatTableDataSource<Paciente>();
  constructor(private _pacienteServicio:PacienteService,
  public dialog: MatDialog,
  private _snackBar:MatSnackBar


   ) {

  }

  ngOnInit(): void {
      this.mostrarPaciente();
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
      next:(dataRespons) =>{console.log(dataRespons);this.dataSource.data=dataRespons;
    
    },error(e) { }

      
  })
}
  
  
  dialogoNuevoPaciente() {
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
  
  dialogoEditarPaciente(dataPaciente:Paciente) {
    this.dialog.open( DialogsAddEditComponent,{
    disableClose:true,
    width:"350px",
    data:dataPaciente
  })
.afterClosed().subscribe(resultado =>{
 if (resultado ==="editado"){
  this.mostrarPaciente();
 }
})

  }
  mostrarAlerta(message: string, accion: string) {
    this._snackBar.open(message, accion, { 
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 2500
    });
  }
  dialogoEliminarPaciente(dataPaciente:Paciente){

    this.dialog.open( DialogoDeleteComponent,{
      disableClose:true,
      data:dataPaciente
    })
  .afterClosed().subscribe(resultado =>{
   if (resultado ==="eliminar"){
    this._pacienteServicio.delete(dataPaciente.idPaciente).subscribe({
      next:(data)=>{
        this.mostrarAlerta("La cita fue eliminada","listo");
        this.mostrarPaciente();
      },
      error:(e)=>{console.log(e)}
    })
   }
  })


  }


}


