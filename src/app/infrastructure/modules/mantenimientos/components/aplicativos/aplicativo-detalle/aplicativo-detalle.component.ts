import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../../global-store/use.reducers';
import * as actions from '../../../../../global-store/use.actions';
import Swal from 'sweetalert2';
import { CrearAplicativoRequest } from 'src/app/domain/dto/AplicativosRequest.dto';
import { AplicativosService } from 'src/app/infrastructure/services/remote/aplicativos.service';
import { constantes } from 'src/app/constants';
import { AplicativoCrearResponse } from 'src/app/domain/dto/AplicativosResponse.dto';

@Component({
  selector: 'app-aplicativo-detalle',
  templateUrl: './aplicativo-detalle.component.html',
  styleUrls: ['./aplicativo-detalle.component.scss']
})
export class AplicativoDetalleComponent {
  estadosAplicativo:any[]=[];
  aplicativo: CrearAplicativoRequest= {
    aplicativo:"",
    descripcion:"",
    activo:"1"
  }
  constructor(private store: Store<AppUseState>,
    private aplicativoServices: AplicativosService){
      this.estadosAplicativo=[
        {name:"Activo", code:"1"},
        {name:"Inactivo", code:"0"}
      ]
  }
  validar():boolean{
    this.aplicativo.aplicativo = this.aplicativo.aplicativo.trim();
    this.aplicativo.descripcion = this.aplicativo.descripcion?.trim();
    if(!this.aplicativo.aplicativo || this.aplicativo.aplicativo.length < 2 || this.aplicativo.aplicativo.length > 100){
      Swal.fire('Atención!', 'El nombre del aplicativo es un campo requerido y debe tener entre 2 y 100 caracteres');
      return false
    }

    if(this.aplicativo.descripcion &&  this.aplicativo.descripcion.length > 100){
      Swal.fire('Atención!', 'La descripción del aplicativo debe tener como máximo 100 caracteres');
      return false
    }

    return true;
  }
  guardarCambios():void{
    if(this.validar()){
      this.registrarAplicativo()
    }
  }
  registrarAplicativo():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.aplicativoServices.postCrearAplicativo({...this.aplicativo}).subscribe({
      next:(data: AplicativoCrearResponse)=>{
        if(data.codigo===constantes.RES_COD_EXITO){
          //Swal.fire('Éxito', data.descripcion, 'success');
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          this.store.dispatch(actions.recuperarAplicativoNuevo({ aplicativo: {...data.data}}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Aplicativo: ' + this.aplicativo.aplicativo,
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
