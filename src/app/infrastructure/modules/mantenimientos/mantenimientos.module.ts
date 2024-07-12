import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MantenimientosRoutingModule } from './routers/mantenimientos-routing.module';
import { EntidadDetalleComponent } from './components/entidades/entidad-detalle/entidad-detalle.component';
import { AplicativoDetalleComponent } from './components/aplicativos/aplicativo-detalle/aplicativo-detalle.component';
import { PersonaDetalleComponent } from './components/personas/persona-detalle/persona-detalle.component';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    EntidadDetalleComponent,
    AplicativoDetalleComponent,
    PersonaDetalleComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    PanelModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    InputMaskModule
  ],
  exports:[
    EntidadDetalleComponent,
    AplicativoDetalleComponent,
    PersonaDetalleComponent
  ]
})
export class MantenimientosModule { }
