import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Especialidad } from 'src/app/Interfaces/especialidad';
import { Paciente } from 'src/app/Interfaces/paciente';
import { EspecialidadService } from 'src/app/Services/especialidad.service';
import { PacienteService } from 'src/app/Services/paciente.service';




export const My_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialogs-add-edit',
  templateUrl: './dialogs-add-edit.component.html',
  styleUrls: ['./dialogs-add-edit.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: My_DATE_FORMATS }
  ]
})
export class DialogsAddEditComponent implements OnInit {
  formPaciente: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaEspecialidad: Especialidad[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogsAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _especialidadServicio: EspecialidadService,
    private _pacienteServicio: PacienteService,
    @Inject(MAT_DIALOG_DATA) public dataPaciente: Paciente
  ) {

    this.formPaciente = this.fb.group({
      nombreCompleto: ['', Validators.required],
      idEspecialidad: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaCita: ['', Validators.required],
    });

    this._especialidadServicio.getList().subscribe({
      next: (data) => {
       
        if (Array.isArray(data)) {
          this.listaEspecialidad = data;
        } else {
          this.listaEspecialidad = [data]; 
        }
      }, 
      error: (e) => { }
    });
    

  }

  mostrarAlerta(message: string, accion: string) {
    this._snackBar.open(message, accion, { 
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 2500
    });
  }

  addEditPaciente() {
    console.log(this.formPaciente.value);

    const modelo: Paciente = {
      idPaciente: 0, 
      nombreCompleto: this.formPaciente.value.nombreCompleto,
      idEspecialidad: this.formPaciente.value.idEspecialidad,
      telefono: this.formPaciente.value.Telefono,
      fechaCita: moment(this.formPaciente.value.fechaCita).format("DD/MM/YYYY")
    }


    if(this.dataPaciente==null){
this._pacienteServicio.add(modelo).subscribe({
      next: (data) => {
        this.mostrarAlerta("La cita fue registrada", "Listo");
        this.dialogoReferencia.close("creado");
      },
      error: (e) => {
        this.mostrarAlerta("No se puede registrar cita", "Error");
        console.error(e); 
      }
    })


    }else{
      this._pacienteServicio.update(this.dataPaciente.idPaciente,modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta("La cita fue editada", "Listo");
          this.dialogoReferencia.close("editado");
        },
        error: (e) => {
          this.mostrarAlerta("No se puede editar cita", "Error");
          console.error(e); 
        }
      })
    }

    
  }

  ngOnInit(): void {
    this._especialidadServicio.getList().subscribe({
      next:(data) =>{
        this.listaEspecialidad=data;
        console.log(data);
      },
      error:(error) =>{
        console.log(error)
      }
    })
    if (this.dataPaciente) {
      this.formPaciente.patchValue({
        nombreCompleto: this.dataPaciente.nombreCompleto,
        idEspecialidad: this.dataPaciente.idEspecialidad,
        Telefono: this.dataPaciente.telefono, 
        fechaCita: moment(this.dataPaciente.fechaCita, 'DD/MM/YYYY')
      })
      
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
      
      ;
    }
    
  }
}
