import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//implementar interface
import { Empleado } from './Interfaces/Empleado';
import { EmpleadoService } from './Services/Empleado.service';
//importar los dialogos
import { MatDialog } from '@angular/material/dialog';
//importamos
import { DialogsComponent } from './dialogs/dialog-add-edit/dialogs.component';

//importamos para trabajar con las alertas de eliminar un empleado
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './dialogs/dialogo-delete/dialogo-delete.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  //title = 'FronEndApi';
  displayedColumns: string[] = [
    'NombreCompleto',
    'Departamento',
    'Sueldo',
    'FechaContrato',
    'Acciones',
  ];

  dataSource = new MatTableDataSource<Empleado>();

  //dentro del contructor creamos la variable private _snackBar para los mensajes

  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mostrarEmpleado();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleado() {
    this.empleadoService.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (e) => {},
    });
  }
  /*   mensaje  */
  dialogoNuevoEmpleado() {
    this.dialog
      .open(DialogsComponent, {
        disableClose: true,
        width: '350px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarEmpleado();
        }
      });
  }

  // metodo para editar

  dialogoEditarEmpleado(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogsComponent, {
        disableClose: true,
        width: '350px',
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarEmpleado();
        }
      });
  }

  //acac voy pegar metodo para  eliminar o la alerta

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  // crear metodo para poder eliinar el empleado

  dialogoEliminarEmpleado(dataEmpleado: Empleado) {
    this.dialog
      .open(DialogoDeleteComponent, {
        disableClose: true,
        data: dataEmpleado,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'eliminar') {
          this.empleadoService.delete(dataEmpleado.idEmpleado).subscribe({
            next: (data) => {
              this.mostrarAlerta('Empleado ue eliminado', 'Listo');
              this.mostrarEmpleado();
            },
            error: (e) => {console.log(e)},
          });
        }
      });
  }
}
