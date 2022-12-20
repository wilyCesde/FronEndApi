import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//importar la libreria d Prime ng
import { MatButtonModule } from '@angular/material/button';
//formaularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
//importar las solicitudes http
import { HttpClientModule } from '@angular/common/http';
//importar para trabajar componenetes tablas,pagiancion etc
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
//para trabajar con las alertas
import { MessagesModule } from 'primeng/messages';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//para trabajar con los dialogos
import { MatDialogModule } from '@angular/material/dialog';
//trabaar con grit
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MessagesModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
