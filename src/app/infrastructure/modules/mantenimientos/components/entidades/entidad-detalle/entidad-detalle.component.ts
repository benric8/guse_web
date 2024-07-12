import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import Swal from 'sweetalert2';
import { CrearEntidadRequest } from 'src/app/domain/dto/EntidadesRequest.dto';
import { EntidadesService } from 'src/app/infrastructure/services/remote/entidades.service';
import { constantes } from 'src/app/constants';
import { EntidadCrearResponse } from 'src/app/domain/dto/EntidadesResponse.dto';

@Component({
  selector: 'app-entidad-detalle',
  templateUrl: './entidad-detalle.component.html',
  styleUrls: ['./entidad-detalle.component.scss']
})
export class EntidadDetalleComponent {
  estadosEntidad:any[]=[];
  entidad: CrearEntidadRequest= {
    entidad:"",
    documento:"",
    activo:"1"
  }
  
  patronDocumento = /^[0-9]{11}$/;
  constructor(private store: Store<AppUseState>,
    private entidadesService: EntidadesService){
      this.estadosEntidad=[
        {name:"Activo", code:"1"},
        {name:"Inactivo", code:"0"}
      ]
  }
  validar():boolean{
    this.entidad.entidad = this.entidad.entidad.trim();
    this.entidad.documento = this.entidad.documento?.trim();
    if(!this.entidad.documento || !this.patronDocumento.test(this.entidad.documento)){
      Swal.fire('Atención!', 'El número de documento de la entidad es un campo requerido y debe tener 11 caracteres');
      return false
    }
    if(!this.entidad.entidad || this.entidad.entidad.length < 2 || this.entidad.entidad.length > 150){
      Swal.fire('Atención!', 'El nombre de la entidad es un campo requerido y debe tener entre 2 y 150 caracteres');
      return false
    }
    return true;
  }
  guardarCambion():void{
    if(this.validar()){
      this.registrarEntidad();
    }
  }
  registrarEntidad():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.entidadesService.postCrearEntidad({...this.entidad}).subscribe({
      next:(data: EntidadCrearResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          this.store.dispatch(actions.recuperarEntidadNuevo({ entidad: {...data.data}}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Entidad: ' + this.entidad.entidad,
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
