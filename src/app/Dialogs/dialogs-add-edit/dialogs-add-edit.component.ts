import { Component, OnInit, inject } from '@angular/core';
import{FormBuilder,FormGroup,Validators} from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Especialidad } from 'src/app/Interfaces/especialidad';
import { Paciente } from 'src/app/Interfaces/paciente';
import { EspecialidadService } from 'src/app/Services/especialidad.service';
import { PacienteService } from 'src/app/Services/paciente.service';
export const My_DATE_FORMATS={
parse:{
  dateInput:'DD/MM/YYYY',
},
display:{
  dateImput:'DD/MM/YYYY',
  monthYearLabel:'MMMM YYYY',
  dateA11yLabel:'LL',
  monthYearA11yLabel:'MMMM YYYY'
}
}

@Component({
  selector: 'app-dialogs-add-edit',
  templateUrl: './dialogs-add-edit.component.html',
  styleUrls: ['./dialogs-add-edit.component.css'],
  providers:[
{provide:MAT_DATE_FORMATS,useValue:My_DATE_FORMATS}
  ]
})
export class DialogsAddEditComponent implements OnInit {
  formPaciente:FormGroup;
  tituloAccion:string="Nuevo";
  botonAccion:string="Guardar";
  listaEspecialidad:Especialidad[]=[];


  constructor(
private dialogoReferencia:MatDialogRef<DialogsAddEditComponent>,
private fb:FormBuilder,
private _snackBar:MatSnackBar,
private _especialidadServicio:EspecialidadService,
private _pacienteServicio:PacienteService
@ Inject(MAT_DIALOG_DATA)public dataPaciente:Paciente
  ) { 

this.formPaciente=this.fb.group({

  nombreCompleto: ['',Validators.required],
  idEspecialidad: ['',Validators.required],
  Telefono: ['',Validators.required],
  fechaCita: ['',Validators.required],
})

this._especialidadServicio.getList().subscribe({
  next:(data)=>{
    this.listaEspecialidad =data;
  },error:(e)=>{}
})

  }

  mostrarAlerta(message: string, accion: string) {
    this._snackBar.open(message, accion{
horizontalPosition:"end",
verticalPosition:"top",
duration:2500

    });
  }
addEditPaciente(){

  console.log(this.formPaciente.value)

  const modelo:Paciente=(
    idEmpleado:0,
    nombreCompleto:this.formPaciente.value.nombreCompleto,
    idPaciente:this.formPaciente.value.idEspecialidad,
    Telefono:this.ParameterType.formPaciente.value.fechaCita,
    fechaCita:moment(this.formPaciente.value.fechaCita).format("DD/MM/YYYY")

  )

  this._pacienteServicio.add(modelo).subscribe({
    next:(data)=>{
this.mostrarAlerta("La cita fue registrada","Listo")
this.dialogoReferencia.close("creado");

    },console.error:(e)=>{
      this.mostrarAlerta("No se puede registrar cita","Error");
    };
    


  })
}


  ngOnInit(): void {

    if(this.dataPaciente){this.formEmpleado.patchValue({
      nombreCompleto: this.dataPaciente.nombreCompleto,
      idEspecialidad: this.dataPaciente.idEspecialidad,
      Telefono: this.dataPaciente.Telefono,
      fechaCita: moment(this.dataPaciente.fechaCita, 'DD/MM/YYYY')

    )}
  }