import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import { AppProcesosState } from '../../../store/procesos.reducers';
import * as querys from '../../../store/procesos.selectors';
import {  Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/domain/dto/ServiciosResponse.dto';
import { ServicioRequest } from 'src/app/domain/dto/ServiciosRequest.dto';
import { EntidadesService } from 'src/app/infrastructure/services/remote/entidades.service';
import { ServiciosService } from 'src/app/infrastructure/services/remote/servicios.service';
import { Entidad, EntidadesComboResponse } from 'src/app/domain/dto/EntidadesResponse.dto';
import { constantes } from 'src/app/constants';
import { GenericResponse } from 'src/app/domain/dto/BaseResponse.dto';
@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.component.html',
  styleUrls: ['./servicio-detalle.component.scss']
})
export class ServicioDetalleComponent implements OnInit, OnDestroy{
  tituloFormulario = ""

  estadosServicio:any[]=[];
  listaEntidades: Entidad[]=[];

  servicioResponse: Servicio = {
    id:0,
    nombreServicio: "",
    descripcion: "",
    url: "",
    actualizarCredencial: "0",
    diasActualizarCredencial: "0",
    activo: "1",
    entidad: null
  }

  servicio: ServicioRequest= {
    nombreServicio: "",
    descripcion: "",
    url: "",
    actualizarCredencial: "0",
    diasActualizarCredencial: null,
    activo: "1",
    idEntidad: null
  }
  actualizarCredencial = false;
  detalleServicio$: Observable<Servicio | null> =  this.storeProcesos.select(querys.getDetalleServicio);
  patronUrl: RegExp = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  entidadDialog = false;
  recuperarEntidadNuevo: Subscription = new Subscription();
  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute,
    private store: Store<AppUseState>, 
    private storeProcesos: Store<AppProcesosState> ,
    private entidadesService: EntidadesService,
    private serviciosService: ServiciosService){
      this.store.dispatch(actions.seleccionarOpcionMenu({url:"/procesos/servicios"}));
      this.estadosServicio=[
        {name:"Activo", code:"1"},
        {name:"Inactivo", code:"0"}
      ]
      this.listarEntidades();
  }

  ngOnInit(): void {
    this.detalleServicio$.subscribe((detalle:Servicio | null) => {
      if(detalle && detalle.id > 0){
        this.tituloFormulario = "Modificar Servicio";
        this.servicioResponse = {...detalle};
        this.servicio.nombreServicio = detalle.nombreServicio;
        this.servicio.descripcion = detalle.descripcion?detalle.descripcion:"";
        this.servicio.url = detalle.url;
        this.servicio.actualizarCredencial = detalle.actualizarCredencial;
        this.servicio.diasActualizarCredencial = detalle.diasActualizarCredencial? +detalle.diasActualizarCredencial: null;
        this.servicio.activo = detalle.activo;
        this.servicio.idEntidad = detalle.entidad?.id? detalle.entidad?.id: null;
        this.actualizarCredencial = detalle.actualizarCredencial === '1';
      }
      else{
        this.tituloFormulario = "Crear Servicio";
        //this.seleccionarStep();
        this.servicioResponse.id = 0;
        this.actualizarCredencial = false;
        this.servicio = {
          nombreServicio: "",
          descripcion: "",
          url: "",
          actualizarCredencial: "0",
          diasActualizarCredencial: null,
          activo: "1",
          idEntidad: null
        }
      }
    });

    this.recuperarEntidadNuevo = this.store.select('recuperarEntidadNuevo').subscribe(( {entidad} ) => {
      if(entidad){
        this.entidadDialog = false;
        //Swal.fire('Exito', 'Entidad seleccionado');
        this.listarEntidades(entidad.id);
        this.store.dispatch(actions.resetearEntidadNuevo());
      }
    });
  }

  listarEntidades(idSeleccionado = 0):void{
    this.entidadesService.getComboEntidades().subscribe({
      next:(response:EntidadesComboResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaEntidades = response.data;
          if(idSeleccionado > 0){
            this.servicio.idEntidad = idSeleccionado;
          }
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

  validar():boolean{
    this.servicio.nombreServicio = this.servicio.nombreServicio.trim();
    this.servicio.descripcion = this.servicio.descripcion.trim();
    this.servicio.url = this.servicio.url.trim();
    if(!this.servicio.idEntidad){
      Swal.fire('Atención!', 'Seleccione una Entidad');
      return false
    }
    if(!this.servicio.nombreServicio || this.servicio.nombreServicio.length < 3 || this.servicio.nombreServicio.length > 50){
      Swal.fire('Atención!', 'El nombre del servicio es un campo requerido y debe tener entre 3 y 50 caracteres');
      return false
    }
    if(!this.servicio.descripcion || this.servicio.descripcion.length < 3 || this.servicio.descripcion.length > 60){
      Swal.fire('Atención!', 'La descripción del servicio es un campo requerido y debe tener como máximo 60 caracteres');
      return false
    }
    if(!this.servicio.url || this.servicio.url ==="" || !this.patronUrl.test(this.servicio.url) || this.servicio.url.length > 120){
      Swal.fire('Atención!', 'La url del servicio es un campo requerido, debe tener el formato correcto y como máximo 120 caracteres');
      return false
    }
    return true;

  }
  guardarCambios():void{
    this.servicio.actualizarCredencial = this.actualizarCredencial?'1':'0';
    if(this.validar()){
      if(this.servicioResponse.id ==0){
        this.registrarServicio();
      }
      else{
        this.actualizarservicio();
      }
    }
    
  }

  actualizarservicio():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));


    this.serviciosService.putActualizarServicio({...this.servicio},this.servicioResponse.id).subscribe({
      next:(data: GenericResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Servicio: ' + this.servicio.nombreServicio,
          });
          this.route.navigate(['../'], {relativeTo: this.activatedRoute});
        }
        else{
          
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire('Atención!', data.descripcion+ '\n Código de Operación:'+ data.codigoOperacion, 'info');
        }
      },
      complete:()=>{
        //console.log('request complete');
      },
      error:(err)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  registrarServicio():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.serviciosService.postCrearServicio({...this.servicio}).subscribe({
      next:(data: GenericResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Servicio: ' + this.servicio.nombreServicio,
          });
          this.route.navigate(['../'], {relativeTo: this.activatedRoute});
        }
        else{
          
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire('Atención!', data.descripcion+ '\n Código de Operación:'+ data.codigoOperacion, 'info');
        }
      },
      complete:()=>{
        //console.log('request complete');
      },
      error:(err)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }
  ngOnDestroy(): void {
    this.recuperarEntidadNuevo.unsubscribe();
  }
}
