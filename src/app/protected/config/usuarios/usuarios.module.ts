import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class Pagina2Module { }
