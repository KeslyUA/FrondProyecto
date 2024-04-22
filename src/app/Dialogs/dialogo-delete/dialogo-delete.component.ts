
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/Interfaces/paciente';
@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
   
    @Inject(MAT_DIALOG_DATA) public dataPaciente: Paciente
  ) { }

  ngOnInit(): void {
  }

  confirmar_Eliminar(){
    if(this.dataPaciente){
      this.dialogoReferencia.close("eliminar")
    }
  }


}
