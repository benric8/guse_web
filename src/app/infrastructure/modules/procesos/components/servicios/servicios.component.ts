import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../global-store/use.reducers';
import * as actions from '../../../../global-store/use.actions';
import { AppProcesosState } from '../../store/procesos.reducers';
import * as actionsProcesos from '../../store/actions';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/infrastructure/services/remote/servicios.service';
import { ListaServicioData, ListaServicioResponse, Servicio } from 'src/app/domain/dto/ServiciosResponse.dto';
import { Entidad, EntidadesComboResponse } from 'src/app/domain/dto/EntidadesResponse.dto';
import { FiltroListarServicios } from 'src/app/domain/dto/ServiciosRequest.dto';
import { EntidadesService } from 'src/app/infrastructure/services/remote/entidades.service';
import { constantes } from 'src/app/constants';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent {
  listaServiciosData: Servicio[] = [];
  //****************************************** */
  
  estadosServicio:any[]=[];

  listaEntidades: Entidad[]=[];

  filtroServicios: FiltroListarServicios ={
    idEntidad:null,
    idServicio:null,
    servicio:null,
    activo:null,
    page:0,
    rows: 10
  }

  first:number=0;// primera pagina
  rows:number = 20; //filas por pagina, valor inicial
  totalRecords:number=50; // total de registros
  pageLinkSize:number=3;

  constructor( private store: Store<AppUseState>,
    private storeProcesos: Store<AppProcesosState>,
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private serviciosServices: ServiciosService,
    private entidadesServices: EntidadesService){
      this.store.dispatch(actions.seleccionarOpcionMenu({url:"/procesos/servicios"}));
      this.estadosServicio=[
        {name:"Activo", code:"1"},
        {name:"Inactivo", code:"0"}
      ]
      this.filtroServicios.page = 0;
      this.filtroServicios.rows = 20;
      this.listarServicios();
      this.listarEntidades();
  }

  listarEntidades():void{
    this.entidadesServices.getComboEntidades().subscribe({
      next:(response:EntidadesComboResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaEntidades = response.data;
        }else{
          Swal.fire('Atención!', response.descripcion+ '\n Código de Operación:'+ response.codigoOperacion, 'info');
        }
      },
      complete:()=>{
      },
      error:(err)=>{
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  listarServicios():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    
    this.serviciosServices.getListaServicios({...this.filtroServicios}).subscribe({
      next:(response:ListaServicioResponse)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        if(response.codigo===constantes.RES_COD_EXITO){
          this.listaServiciosData= response.data.lista;
          this.totalRecords = response.data.totalRecords;
        }
        else{
          Swal.fire('Atención!', response.descripcion+ '\n Código de Operación:'+ response.codigoOperacion, 'info');
        }
        
      },
      complete:()=>{

      },
      error:(err)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  recargarListaEventClick(){
    this.listarServicios();
  }

  detalleEventClick( detalle: Servicio){
    this.storeProcesos.dispatch(actionsProcesos.cargarDetalleServicio({detalle: detalle}));
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.route.navigate(['detalle'], {relativeTo: this.activatedRoute});
  }

  configurarEventClick( detalle: Servicio){
    this.storeProcesos.dispatch(actionsProcesos.cargarDetalleServicio({detalle: detalle}));
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.route.navigate(['configurar'], {relativeTo: this.activatedRoute});
  }

  paginate(event:any):void {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    /*
    console.log("firts " + event.first.toString());
    console.log("rows " + event.rows.toString());
    console.log("page " + event.page.toString());
    console.log("pageCont " + event.pageCount.toString());*/
    this.filtroServicios.rows = event.rows;
    this.filtroServicios.page = event.page;
    this.listarServicios();
  }
  nuevoEventClick():void{
    let nuevaServicio: Servicio = {
      id: 0,
      nombreServicio:"",
      descripcion: "",
      url: "",
      actualizarCredencial: "",
      diasActualizarCredencial: null,
      activo: "",
      entidad: null
    }
    this.storeProcesos.dispatch(actionsProcesos.cargarDetalleServicio({detalle: nuevaServicio}));
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.route.navigate(['detalle'], {relativeTo: this.activatedRoute});
  }

}
