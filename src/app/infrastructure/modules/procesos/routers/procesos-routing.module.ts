import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/infrastructure/layouts/layout/layout.component';
import { ServiciosComponent } from '../components/servicios/servicios.component';
import { ServicioDetalleComponent } from '../components/servicios/servicio-detalle/servicio-detalle.component';
import { ServicioAsociarComponent } from '../components/servicios/servicio-asociar/servicio-asociar.component';
import { ClientesComponent } from '../components/clientes/clientes.component';
import { ClienteDetalleComponent } from '../components/clientes/cliente-detalle/cliente-detalle.component';
import { PageNotFoundComponent } from 'src/app/infrastructure/shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      { path: 'servicios',
        children: [
          { path: '', component: ServiciosComponent },
          { path: 'detalle', component: ServicioDetalleComponent },
          { path: 'configurar', component: ServicioAsociarComponent },
        ]
      },
      { path: 'clientes',
        children: [
          { path: '', component: ClientesComponent },
          { path: 'detalle', component: ClienteDetalleComponent },
        
        ]
      },
      { path: '**', component: PageNotFoundComponent, data: { title: 'Pagina no encontrada' }}  
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
