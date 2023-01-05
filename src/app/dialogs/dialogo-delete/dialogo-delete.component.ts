// creamo las import nesesario como inject y mat_dialog

import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//importamos  la interface de empleado

import { Empleado } from 'src/app/Interfaces/Empleado';


@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {

// acuerdese export DialogoDeleteComponent simpre va dentro del contructor

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) { }

  ngOnInit(): void {
  }

  //crear un metodo por si a prcionado el boton eliminar

  confirmarEliminar(){
    if(this.dataEmpleado){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
