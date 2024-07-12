import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProcesosRoutingModule } from './routers/procesos-routing.module';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ServicioDetalleComponent } from './components/servicios/servicio-detalle/servicio-detalle.component';
import { ServicioAsociarComponent } from './components/servicios/servicio-asociar/servicio-asociar.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle/cliente-detalle.component';

import { StoreModule } from '@ngrx/store';
import { appProcesosReducers } from './store/procesos.reducers';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {InputMaskModule} from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';

import { MantenimientosModule } from '../mantenimientos/mantenimientos.module';

@NgModule({
  declarations: [
    ServiciosComponent,
    ClientesComponent,
    ServicioDetalleComponent,
    ServicioAsociarComponent,
    ClienteDetalleComponent
  ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RippleModule,
    DialogModule,
    TableModule,
    ToolbarModule,
    OverlayPanelModule,
    CalendarModule,
    FieldsetModule,
    DividerModule,
    PaginatorModule,
    PanelModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    MultiSelectModule,
    InputMaskModule,
    PasswordModule,
    MantenimientosModule,
    InputNumberModule,
    StoreModule.forFeature('ProcesosModule', appProcesosReducers)
  ]
})
export class ProcesosModule { }
