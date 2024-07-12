import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import Swal from 'sweetalert2';
import { PersonaRequest } from 'src/app/domain/dto/PersonasRequest.dto';
import { PersonasService } from 'src/app/infrastructure/services/remote/personas.service';
import { constantes } from 'src/app/constants';
import { BuscarPerSigaResponse, ComboTipoDocResponse, PersonaCrearResponse, TipoDocumento } from 'src/app/domain/dto/PersonasResponse.dto';

@Component({
  selector: 'app-persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.scss']
})
export class PersonaDetalleComponent {
  estadosPersona:any[]=[];
  persona: PersonaRequest= {
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: null,
    fechaNacimiento: null,
    documentoIdentidad: "",
    direccion: "",
    email: null,
    tipoDocumento:"" ,
    activo: "1"
  }
  listaTiposDoc: TipoDocumento[]=[];
  tipoDocSeleccionado: string ="";
  fechaNacimiento: Date = new Date();
  datosSiga:boolean = false;

  patronDni  = /^[0-9]{8}$/;
  patronEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private store: Store<AppUseState>,
    private personasService: PersonasService){
      this.estadosPersona=[
        {name:"Activo", code:"1"},
        {name:"Inactivo", code:"0"}
      ]
      this.listarTiposDoc();
  }

  listarTiposDoc():void{
    this.personasService.getComboTipoDocumento().subscribe({
      next:(response:ComboTipoDocResponse)=>{
        if(response.codigo===constantes.RES_COD_EXITO){
          this.listaTiposDoc = response.data;
        }
        else{
          Swal.fire('Atención!', response.descripcion+ '\n Código de Operación:'+ response.codigoOperacion, 'info');
        }
      },
      complete:()=>{
        //console.log('request complete');
      },
      error:(err)=>{
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  eventSelectTipoDoc(e:any){
    this.limpiarDatosSiga();
    if(this.persona.tipoDocumento === '1'){
      this.datosSiga = true;
    }
    else{
      this.datosSiga = false
    }
  }

  limpiarDatosSiga(){
    this.persona.nombres = "";
    this.persona.apellidoPaterno = "";
    this.persona.apellidoMaterno = "";

  }

  consultarSiga():void{
    if(this.persona.tipoDocumento === '1'){
      this.datosSiga = true;
      if(this.persona.documentoIdentidad.trim().length==8){
        this.store.dispatch(actions.mostrarCargando({ estado: true}));
        this.personasService.getBuscarPersonaSiga({numeroDocumentoIdentidad:this.persona.documentoIdentidad}).subscribe({
          next:(response:BuscarPerSigaResponse)=>{
            this.store.dispatch(actions.mostrarCargando({ estado: false}));
            if(response.codigo===constantes.RES_COD_EXITO){
              this.persona.nombres = response.data.nombres;
              this.persona.apellidoPaterno = response.data.apellidoPaterno;
              this.persona.apellidoMaterno = response.data.apellidoMaterno;
            }
            else{
              Swal.fire('Atención!', response.descripcion+ '\n Código de Operación:'+ response.codigoOperacion, 'info');
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
      else{
        Swal.fire('Atención!', "El número de documento debe tener 8 dígitos", 'warning');
        this.limpiarDatosSiga();
      }
    }
    else{
      this.datosSiga = false;
    }
  }
  numeroAñosFecha(fecha:string):number{
    try{
      return (new Date()).getFullYear() - (new Date(fecha)).getFullYear()
    }
    catch(e){
      return 0
    }
  }
  validar():boolean{
    this.persona.nombres = this.persona.nombres.trim();
    this.persona.apellidoPaterno = this.persona.apellidoPaterno.trim();
    this.persona.apellidoMaterno = this.persona.apellidoMaterno?.trim();
    this.persona.documentoIdentidad = this.persona.documentoIdentidad.trim();
    this.persona.direccion = this.persona.direccion?.trim();
    this.persona.email = this.persona.email?.trim();
    this.persona.tipoDocumento = this.persona.tipoDocumento.trim();
    if(this.persona.tipoDocumento==""){
      Swal.fire('Atención!', 'Seleccione un Tipo de documento');
      return false;
    }
    if(this.persona.tipoDocumento === "1" && !this.patronDni.test(this.persona.documentoIdentidad)){
      Swal.fire('Atención!', 'El campo numero de documento es requerido y debe tener 8 numéricos');
      return false;
    }
    if(this.persona.tipoDocumento != "0" && this.persona.documentoIdentidad.length> 20 ){
      Swal.fire('Atención!', 'El campo numero de documento es requerido y debe tener como como máximo 20 caracteres');
      return false;
    }
    if(!this.persona.nombres || this.persona.nombres.length > 60){
      Swal.fire('Atención!', 'El campo “Nombre” es requerido y debe tener como máximo 60 caracteres');
      return false;
    }
    if(!this.persona.apellidoPaterno || this.persona.apellidoPaterno.length > 60){
      Swal.fire('Atención!', 'El campo “Apellido paterno" es requerido  y debe tener como máximo 60 caracteres');
      return false;
    }
    if(this.persona.apellidoMaterno && this.persona.apellidoMaterno.length > 60){
      Swal.fire('Atención!', 'El campo “Apellido materno" es requerido  y debe tener como máximo 60 caracteres');
      return false;
    }
    if(!this.persona.fechaNacimiento){
      Swal.fire('Atención!', 'Ingrese la Fecha de nacimiento de la persona');
      return false;
    }
    if(this.persona.fechaNacimiento && this.numeroAñosFecha(this.persona.fechaNacimiento) < 16){
      Swal.fire('Atención!', 'La Fecha de nacimiento de la persona no es valido');
      return false;
    }

    if(this.persona.email && !this.patronEmail.test(this.persona.email)){
      Swal.fire('Atención!', 'Ingrese el email de la persona y debe tener un formato valido');
      return false;
    }

    if(this.persona.direccion && this.persona.direccion.length>150){
      Swal.fire('Atención!', 'La dirección de la persona debe tener máximo 150 caracteres');
      return false;
    }
    return true;
  }

  guardarCambios():void{
    if(this.validar()){
      this.registrarPersona();
    }
  }

  registrarPersona():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.personasService.postCrearPersona({...this.persona}).subscribe({
      next:(data: PersonaCrearResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          this.store.dispatch(actions.recuperarPersonaNuevo({ persona: {...data.data}}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'N° Documento:' + this.persona.documentoIdentidad +'<br/>'+
            'Nombres: ' + this.persona.nombres + ' ' +this.persona.apellidoPaterno + ' '+this.persona.apellidoMaterno,
          });
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

}
