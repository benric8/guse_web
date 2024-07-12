import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppUseState } from '../../../../global-store/use.reducers';
import * as actions from '../../../../global-store/use.actions';
import { AppProcesosState } from '../../store/procesos.reducers';
import * as actionsProcesos from '../../store/actions';
import Swal from 'sweetalert2';
import { Cliente, ListaClienteResponse } from 'src/app/domain/dto/ClientesResponse.dto';
import { Aplicativo, AplicativosComboResponse } from 'src/app/domain/dto/AplicativosResponse.dto';
import { ComboPersonasResponse, PersonaData } from 'src/app/domain/dto/PersonasResponse.dto';
import { ActualizarCredencialRequest, FiltroListarClientes } from 'src/app/domain/dto/ClientesRequest.dto';
import { ClientesService } from 'src/app/infrastructure/services/remote/clientes.service';
import { AplicativosService } from 'src/app/infrastructure/services/remote/aplicativos.service';
import { PersonasService } from 'src/app/infrastructure/services/remote/personas.service';
import { constantes } from 'src/app/constants';
import { GenericResponse } from 'src/app/domain/dto/BaseResponse.dto';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  listaClienteData: Cliente[] = [];
  estadosCliente:any[]=[];

  listaAplicativos: Aplicativo[]=[];
  listaPersonas: PersonaData[]=[];

  filtroClientes: FiltroListarClientes ={
    idCliente:null,
    idAplicativo:null,
    idPersona:null,
    usuario:null,
    activo:null,
    page:0,
    rows: 10
  }

  //currentPage:number=3;
  //pagesTotal:number=5;
  first:number=0;// primera pagina
  rows:number = 20; //filas por pagina, valor inicial
  totalRecords:number=50; // total de registros
  pageLinkSize:number=3;

  filtroTabla="";
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
    this.filtroClientes.page = 0;
    this.filtroClientes.rows = 20;
    this.listarClientes();
    this.listarAplicativos();
    this.listarPersonas();
  }

  listarAplicativos():void{
    this.aplicativoServices.getComboAplicativos().subscribe({
      next:(response:AplicativosComboResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaAplicativos = response.data;
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
  
  listarPersonas():void{
    this.personaServices.getComboPersonas().subscribe({
      next:(response:ComboPersonasResponse)=>{
        if(response.codigo ===constantes.RES_COD_EXITO){
          this.listaPersonas = response.data;
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

  listarClientes():void{
    this.filtroTabla = "";
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.clienteServices.getListaClientes({...this.filtroClientes}).subscribe({
      next:(response:ListaClienteResponse)=>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        if(response.codigo===constantes.RES_COD_EXITO){
          this.listaClienteData= response.data.lista;
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
    this.listarClientes();
  }

  detalleEventClick( detalle: Cliente){
    this.storeProcesos.dispatch(actionsProcesos.cargarDetalleCliente({detalle: detalle}));
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.route.navigate(['detalle'], {relativeTo: this.activatedRoute});
  }

  actualizarCredencialEventClick( detalle: Cliente){
    Swal.fire({
      title:'Actualizar credencial',
      html: '<b>Aplicativo:</b> '+ detalle.aplicativo?.aplicativo +'<br/>' +
      '<b>Usuario:</b> '+ detalle.usuario +'<br/><br/>' +
      '¿Desea actualizar la credencial del cliente seleccionado?',
      showDenyButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Actualizar credencial',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarCredencialCliente(detalle);
      } else if (result.isDenied) {
        
      }
    })
  }

  actualizarCredencialCliente( detalle: Cliente){
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    let actCredencialReq: ActualizarCredencialRequest ={
      auditoria:{
        direccionMac:"00:00:00:00:00:00",
        nombrePc:"PC-TEST",
        numeroIp:"192.168.1.1"
      }
    }
    this.clienteServices.putActualizarCredencialCliente({...actCredencialReq},detalle.id).subscribe({
      next:(data:GenericResponse)=>{
        this.store.dispatch(actions.mostrarCargando({estado: false}));
        if(data.codigo===constantes.RES_COD_EXITO){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/><br/>' +
            '<b>Aplicativo:</b> '+ detalle.aplicativo?.aplicativo +'<br/>' +
            '<b>Usuario:</b> '+ detalle.usuario,
          });
        }
        else{
          Swal.fire('Atención!', data.descripcion+ '\n Código de Operación:'+ data.codigoOperacion, 'info');
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

  paginate(event:any):void {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    /*
    console.log("firts " + event.first.toString());// primera pagina
    console.log("rows " + event.rows.toString());// registros por pagina
    console.log("page " + event.page.toString());// pagina actual
    console.log("pageCont " + event.pageCount.toString()); // total de paginas
    */
    this.filtroClientes.rows = event.rows;
    this.filtroClientes.page = event.page;
    this.listarClientes();
  }

  nuevoEventClick():void{
    let nuevaCliente: Cliente = {
      id: 0,
      idPersona:0,
      idAplicativo:0,
      usuario:"",
      clave: "",
      cuota: 0,
      usuarioRegistra: "",
      usuarioActualiza: "",
      fechaActualizacion: "",
      activo: "",
      persona: null,
      aplicativo: null
    }
    this.storeProcesos.dispatch(actionsProcesos.cargarDetalleCliente({detalle: nuevaCliente}));
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.route.navigate(['detalle'], {relativeTo: this.activatedRoute});
  }

}


