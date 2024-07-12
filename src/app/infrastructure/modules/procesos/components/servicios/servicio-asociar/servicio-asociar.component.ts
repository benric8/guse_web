import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import { AppProcesosState } from '../../../store/procesos.reducers';
import * as querys from '../../../store/procesos.selectors';
import {  Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiciosService } from 'src/app/infrastructure/services/remote/servicios.service';
import { AplicativosService } from 'src/app/infrastructure/services/remote/aplicativos.service';
import { Aplicativo, AplicativoDetalleResponse, AplicativosComboResponse } from 'src/app/domain/dto/AplicativosResponse.dto';
import { DetalleServicioData, DetalleServicioResponse, Servicio } from 'src/app/domain/dto/ServiciosResponse.dto';
import { constantes } from 'src/app/constants';
import { AsociarAplicativosRequest, AsociarItem } from 'src/app/domain/dto/ServiciosRequest.dto';
import { GenericResponse } from 'src/app/domain/dto/BaseResponse.dto';

@Component({
  selector: 'app-servicio-asociar',
  templateUrl: './servicio-asociar.component.html',
  styleUrls: ['./servicio-asociar.component.scss']
})
export class ServicioAsociarComponent implements OnInit, OnDestroy{
  tituloFormulario ="Asociar Aplicaciones a Servicio"

  listaAplicativos: Aplicativo[]=[];
  aplicativosSeleccionado: Aplicativo[]=[];
  aplicativoAgregado:Aplicativo | null = null

  servicioDetalle: DetalleServicioData | null = null;
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
  asociarConf: AsociarAplicativosRequest ={
    idServicio: 0,
    aplicativos: []
  }
  detalleServicio$: Observable<Servicio | null> =  this.storeProcesos.select(querys.getDetalleServicio);

  aplicacionDialog = false;
  recuperarAplicativoNuevo: Subscription = new Subscription();
  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute,
    private store: Store<AppUseState>, 
    private storeProcesos: Store<AppProcesosState> ,
    private serviciosService: ServiciosService,
    private aplicativosService: AplicativosService){
      this.store.dispatch(actions.seleccionarOpcionMenu({url:"/procesos/servicios"}));
      this.listarAplicativos();
  }

  ngOnInit(): void {
    this.detalleServicio$.subscribe((detalle:Servicio | null) => {
      if(detalle && detalle.id > 0){
        this.servicioResponse = {...detalle};
        this.asociarConf.idServicio = detalle.id;
      }
      else{
        //Swal.fire('Atención!', "Seleccione un servicio");
        this.route.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    });
    this.recuperarAplicativoNuevo = this.store.select('recuperarAplicativoNuevo').subscribe(( {aplicativo} ) => {
      if(aplicativo){
        this.aplicacionDialog = false;
        //Swal.fire('Exito', 'Entidad seleccionado');
        this.aplicativoAgregado= {...aplicativo};
        this.listarAplicativos(aplicativo.id);
        this.store.dispatch(actions.resetearAplicativoNuevo());
      }
    });
  }

  serviciooDetalle(idServicio:number):void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.serviciosService.getDetalleServicio(idServicio).subscribe({
      next:(response:DetalleServicioResponse)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.servicioDetalle =  response.data;
          this.aplicativosSeleccionado = [...this.servicioDetalle.aplicativosAsociados]
          /*this.servicioDetalle.aplicativosAsociados.forEach(aplica =>{
            this.aplicativosSeleccionado.push(aplica)
          })*/
        }else{
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

  listarAplicativos(idSeleccionado = 0):void{
    this.aplicativosService.getComboAplicativos().subscribe({
      next:(response:AplicativosComboResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaAplicativos= response.data;

          if(idSeleccionado==0 && this.servicioResponse && this.servicioResponse.id > 0){
            this.serviciooDetalle(this.servicioResponse.id);
          }

          if(idSeleccionado > 0 && this.aplicativoAgregado){
            this.aplicativosSeleccionado.push(this.aplicativoAgregado);
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
  aplicativoDetalle(idAplicativo:number): Aplicativo | null{
    let aplicacionDetalle: Aplicativo | null = null;
    this.aplicativosService.getDetalleAplicativo(idAplicativo).subscribe({
      next:(response:AplicativoDetalleResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          aplicacionDetalle =  response.data;
        }else{
          Swal.fire('Atención!', response.descripcion+ '\n Código de Operación:'+ response.codigoOperacion, 'info');
          aplicacionDetalle = null;
        }
      },
      complete:()=>{
      },
      error:(err)=>{
        Swal.fire('Atención!', err, 'warning');
        aplicacionDetalle = null;
      }
    });
    return aplicacionDetalle;
  }

  cargarAplicativosSeleccionados(ids:String){
    let lIds = ids.split(',');
    //console.log('ids ', ids);
    lIds.forEach(id =>{
      let aux = this.buscarAplicativo(parseInt(id));
      //console.log('perfil busqueda ',aux);
      if(aux){ this.aplicativosSeleccionado.push(aux);}
    })
  }

  buscarAplicativo(id: number): Aplicativo|null{
    let perfilS = null;
    for(let i =0; i< this.listaAplicativos.length; i++){
      if(this.listaAplicativos[i].id === id){
        return this.listaAplicativos[i];
        break;
      }
    }
    return null;
  }
  
  asociarAplicativos():AsociarItem[]{
    let items:AsociarItem[] = [];
    this.aplicativosSeleccionado.forEach(aplicat =>{
      items.push({id: aplicat.id})
    })
    return items;
  }

  registrarConfServicio():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.asociarConf.aplicativos = this.asociarAplicativos();

    this.serviciosService.postAsociarAplicativos({...this.asociarConf}).subscribe({
      next:(data: GenericResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Servicio: ' + this.servicioResponse.nombreServicio,
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
    this.recuperarAplicativoNuevo.unsubscribe();
  }
}
