import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import { AppProcesosState } from '../../../store/procesos.reducers';
import * as querys from '../../../store/procesos.selectors';
import {  Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Aplicativo, AplicativosComboResponse } from 'src/app/domain/dto/AplicativosResponse.dto';
import { ComboPersonasResponse, PersonaData } from 'src/app/domain/dto/PersonasResponse.dto';
import { ClientesService } from 'src/app/infrastructure/services/remote/clientes.service';
import { AplicativosService } from 'src/app/infrastructure/services/remote/aplicativos.service';
import { PersonasService } from 'src/app/infrastructure/services/remote/personas.service';
import { constantes } from 'src/app/constants';
import { Cliente } from 'src/app/domain/dto/ClientesResponse.dto';
import { ClienteRequest } from 'src/app/domain/dto/ClientesRequest.dto';
import { GenericResponse } from 'src/app/domain/dto/BaseResponse.dto';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit, OnDestroy{
  tituloFormulario =""
  estadosCliente:any[]=[];

  listaAplicativos: Aplicativo[]=[];
  aplicativoSeleccionado: Aplicativo | null = null;

  listaPersonas: PersonaData[]=[];
  personaSeleccionado: PersonaData | null = null;

  clienteResponse: Cliente = {
    id:0,
    usuario: "",
    clave: "",
    cuota: 0,
    usuarioRegistra: "",
    usuarioActualiza: "",
    fechaActualizacion: "",
    activo: "1",
    idPersona: 0,
    idAplicativo: 0,
    persona: null,
    aplicativo: null
  }

  cliente: ClienteRequest= {
    idPersona: 0,
    idAplicativo:0,
    usuario: "",
    clave: "",
    cuota: 0,
    activo: "1",
  }

  actualizarCredencial = false;
  detalleCliente$: Observable<Cliente | null> =  this.storeProcesos.select(querys.getDetalleCliente);

  aplicacionDialog = false;
  recuperarAplicativoNuevo: Subscription = new Subscription();

  personaDialog = false;
  recuperarPersonaNuevo: Subscription = new Subscription();
  constructor(
    private store: Store<AppUseState>,
    private storeProcesos: Store<AppProcesosState>,
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private clienteServices: ClientesService,
    private aplicativoServices: AplicativosService,
    private personaServices: PersonasService
  ){
    this.store.dispatch(actions.seleccionarOpcionMenu({url:"/procesos/clientes"}));
    this.estadosCliente=[
      {name:"Activo", code:"1"},
      {name:"Inactivo", code:"0"}
    ]
    this.listarAplicativos();
    this.listarPersonas();
  }


  ngOnInit(): void {
    this.detalleCliente$.subscribe((detalle:Cliente | null) => {
      if(detalle && detalle.id > 0){
        this.tituloFormulario="Modificar Cliente";
        this.clienteResponse = {...detalle};
        this.cliente.idPersona = detalle.idPersona;
        this.cliente.idAplicativo = detalle.idAplicativo;
        this.cliente.usuario = detalle.usuario;
        this.cliente.clave = detalle.clave? detalle.clave: "";
        this.cliente.cuota = detalle.cuota;
        this.cliente.activo = detalle.activo? detalle.activo: "0";
      }
      else{
        this.tituloFormulario="Crear Cliente";
        //this.seleccionarStep();
        this.clienteResponse.id = 0;
        this.cliente = {
          idPersona: 0,
          idAplicativo:0,
          usuario: "",
          clave: "",
          cuota: 0,
          activo: "1",
        }
      }
    });

    this.recuperarAplicativoNuevo = this.store.select('recuperarAplicativoNuevo').subscribe(( {aplicativo} ) => {
      if(aplicativo){
        this.aplicacionDialog = false;
        //Swal.fire('Exito', 'Entidad seleccionado');
        this.listarAplicativos(aplicativo.id);
        this.store.dispatch(actions.resetearAplicativoNuevo());
      }
    });

    this.recuperarPersonaNuevo = this.store.select('recuperarPersonaNuevo').subscribe(( {persona} ) => {
      if(persona){
        this.personaDialog = false;
        //Swal.fire('Exito', 'Entidad seleccionado');
        this.listarPersonas(persona.id);
        this.store.dispatch(actions.resetearPersonaNuevo());
      }
    });
  }

  listarAplicativos(idSeleccionado = 0):void{
    this.aplicativoServices.getComboAplicativos().subscribe({
      next:(response:AplicativosComboResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaAplicativos = response.data;
          if(idSeleccionado==0 && this.clienteResponse && this.clienteResponse.id > 0){
            this.obtenerAplicativo(this.clienteResponse.idAplicativo);
          }
          if(idSeleccionado>0){
            this.cliente.idAplicativo = idSeleccionado;
            this.obtenerAplicativo(idSeleccionado);
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
  changeComboAplicativos(event:any):void{
    let idAplicativo:number = event.value;
    this.obtenerAplicativo(idAplicativo);
  }
  obtenerAplicativo(idAplicativo: number):void{
    this.aplicativoSeleccionado = this.listaAplicativos.filter(aplica => aplica.id == idAplicativo)[0];
  }
  listarPersonas(idSeleccionado = 0):void{
    this.personaServices.getComboPersonas().subscribe({
      next:(response:ComboPersonasResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaPersonas = response.data;
          if(idSeleccionado==0 && this.clienteResponse && this.clienteResponse.id > 0){
            this.obtenerPersona(this.clienteResponse.idPersona);
          }
          if(idSeleccionado>0){
            this.cliente.idPersona = idSeleccionado;
            this.obtenerPersona(idSeleccionado);
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

  changeComboPersonas(event:any):void{
    let idPersona:number = event.value;
    this.obtenerPersona(idPersona);
  }
  obtenerPersona(idPersona: number):void{
    this.personaSeleccionado = this.listaPersonas.filter(perso => perso.id == idPersona)[0];
  }

  validar():boolean{
    this.cliente.clave = this.cliente.clave.trim();
    this.cliente.usuario = this.cliente.usuario.trim();
    if(this.cliente.idAplicativo==0){
      Swal.fire('Atención!', 'Seleccione un Aplicativo');
      return false
    }
    if(!this.cliente.usuario || this.cliente.usuario.length < 8 || this.cliente.usuario.length > 50){
      Swal.fire('Atención!', 'El usuario es un campo requerido y debe tener entre 8 y 50 caracteres');
      return false
    }
    if( this.clienteResponse.id==0 && (!this.cliente.clave || this.cliente.clave.length < 8 || this.cliente.clave.length > 50)){
      Swal.fire('Atención!', 'La clave es un campo requerido y debe tener entre 8 y 50 caracteres');
      return false
    }
    if(this.cliente.idPersona==0){
      Swal.fire('Atención!', 'Seleccione una persona responsable asociado al cliente');
      return false
    }
    return true;
  }

  guardarCambios():void{
    if(this.validar()){
      if(this.clienteResponse.id ==0){
        this.registrarCliente();
      }
      else{
        this.actualizarCliente();
      }
    }

  }

  actualizarCliente():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.clienteServices.putActualizarCliente({...this.cliente},this.clienteResponse.id).subscribe({
      next:(data: GenericResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Usuario: ' + this.cliente.usuario,
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

  
  registrarCliente():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.clienteServices.postCrearCliente({...this.cliente}).subscribe({
      next:(data: GenericResponse)=>{
        if(data.codigo === constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Usuario: ' + this.cliente.usuario,
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
    this.recuperarPersonaNuevo.unsubscribe();
  }
}
