import { Component, OnInit, Inject } from '@angular/core';
//Injet para trabaar con staos que vienen desde otro componente
//importar los recursos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importar Para poder trabajar con los dialogos
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//MAT_DIALOG_DATA optenemos la informacio que viene desde el dialogo
//Para trabajar conlas alertas
import { MatSnackBar } from '@angular/material/snack-bar';
//Utilizar el formato de las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
//Libreria para moment
import * as moment from 'moment';
// importar la interface
import { Departamento } from '../../Interfaces/Departamento';
import { Empleado } from '../../Interfaces/Empleado';
//importar los servicios
import { DepartamentoService } from '../../Services/Departamento.service';
import { EmpleadoService } from '../../Services/Empleado.service';

//Exportar el formato de las fechas
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYY',
  },
  display: {
    dateInput: 'DD/MM/YYY',
    monthYearLabel: 'MMMMYYYY',
    dateA11yLabel: 'LL',
    monthYearA11Label: 'MMMMYYYY',
  },
};

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
  //agregamos el formato de fecha
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DialogsComponent implements OnInit {
  //crear las variables para este componente
  formEmpleado: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  listaDepartamento: Departamento[] = [];

  //inyectamos la referencias dentro del contructor o inyeccion de dependencias
  //aqui tambien trabajamos con la ventana editar para modif la info
  constructor(
    private dialogoReferencia: MatDialogRef<DialogsComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _departamentoServicio: DepartamentoService,
    private _empleadoServicio: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: Empleado
  ) {
    //especificar el formulario con todos los campos

    this.formEmpleado = this.fb.group({
      nombreCompleto: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      sueldo: ['', Validators.required],
      fechaContrato: ['', Validators.required],
    });

    //llamar departamentoServicio optener una lista  de totod los departamentos

    this._departamentoServicio.getList().subscribe({
      next: (data) => {
        this.listaDepartamento = data;
      },
      error: (e) => {},
    });
  }
  //crear un metodo para las alertas snaKbar= Alertas dentro de las llaves ponemos tiempo y posocion
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  //metodo para emviarmodelo empleado a la tabla para pder registarlo
  addEditEmpleado() {
    console.log(this.formEmpleado.value);
    /* crear modelo para empleado con sus proiedades */
    const modelo: Empleado = {
      idEmpleado: 0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: moment(this.formEmpleado.value.fechaContrato).format(
        'DD/MM/YYYY'
      ),
    };

    if (this.dataEmpleado == null) {
      // ejeutar el api  crear el nuevo empleado
      this._empleadoServicio.add(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleadofue creado', 'Listo');
          this.dialogoReferencia.close('creado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo crear', 'Error');
        },
      });

    }else{
      this._empleadoServicio.uptade(this.dataEmpleado.idEmpleado,modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Empleado fue editado', 'Listo');
          this.dialogoReferencia.close('editado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo editar', 'Error');
        },
      });
    }
  }

  //para editar vamos trabajar con el boton  ngOnInit
  //moment para poder modificar el formatode las fechas

  ngOnInit(): void {
    if (this.dataEmpleado) {
      this.formEmpleado.patchValue({
        nombreCompleto: this.dataEmpleado.nombreCompleto,
        idDepartamento: this.dataEmpleado.idDepartamento,
        sueldo: this.dataEmpleado.sueldo,
        fechaContrato: moment(this.dataEmpleado.fechaContrato, 'DD/MM/YYYY'),
      });

      //modificar titulos

      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

}
