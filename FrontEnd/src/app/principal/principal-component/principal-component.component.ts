import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-principal-component',
  templateUrl: './principal-component.component.html',
  styleUrls: ['./principal-component.component.css']
})
export class PrincipalComponentComponent implements OnInit {
  estados = [false,false,false,false];
  numControl = '';
  idDocente = '';
  hora = '';
  

  constructor(private _apiService:ApiService) { }

  ngOnInit(): void {
  }
  //Método para mostrar el formulario correspondiente y cambiar el color de los botones superiores
  activarBoton = (boton:any) =>{
    const botones = document.getElementsByClassName("btnNav");

    for (let i = 0; i < botones.length; i++) {
      if (i == boton) {
        botones[i]?.classList.add("active");
        this.estados[boton] = true;      
      }else{
        botones[i]?.classList.toggle("active",false);
        this.estados[i] = false;
      }   
    }
  }
  
  buscarAlumno = () =>{
    console.clear();
    this._apiService.consultarAlumno(this.numControl).subscribe((resp:any) =>{ 
      
      //Validamos si es que hubo respuesta de la BD
      if (resp.respDatosAlumno.rowCount == 0) {
        console.error("%cAlumno no registrado","font-size:20px");     
      }else{
        console.log("%cAlumno Encontrado","color:green;font-size:20px");
        console.log(resp.respDatosAlumno.rows);
        this._apiService.localizarAlumno(this.numControl).subscribe((resp:any) =>{
          console.log(resp.respHorarioAlumno.rows);
          //Guardamos las filas que retorna la bd
          let valores = resp.respHorarioAlumno.rows;

          //Recorremos las rows para con las horas determinar la ubicación
          for (const valor in valores) {
            let horainicio = valores[valor]["horainicio"];
            let horafin = valores[valor]["horafin"];
            
            //Validamos que la hora de búsqueda esté en el rango
            if ((this.hora >= horainicio) && (this.hora <= horafin)) {
              console.log(`%cEl alumno se encuentra en el edificio ${valores[valor]["idedificiohorario"]} aula ${valores[valor]["numeroaulahorario"]}`,"color:yellow;font-size:20px");          
            }
          }
        });
      }
    });
  }

  buscarProfesor = () =>{
    console.clear();
    this._apiService.consultarDocente(this.idDocente).subscribe((resp:any) =>{ 
      //Validamos si es que hubo respuesta de la BD
      if (resp.respDatosDocente.rowCount == 0) {
        console.error("%cProfesor no registrado","font-size:20px");     
      }else{
        console.log("%cProfesor Encontrado","color:green;font-size:20px");
        console.log(resp.respDatosDocente.rows);
        this._apiService.localizarDocente(this.idDocente).subscribe((resp:any) =>{
          console.log(resp.respHorarioDocente.rows);
          //Guardamos las filas que retorna la bd
          let valores = resp.respHorarioDocente.rows;

          //Recorremos las rows para con las horas determinar la ubicación
          for (const valor in valores) {
            let horainicio = valores[valor]["horainicio"];
            let horafin = valores[valor]["horafin"];

            //Validamos que la hora de búsqueda esté en el rango
            if ((this.hora >= horainicio) && (this.hora <= horafin)) {
              console.log(`%cEl docente se encuentra en el edificio ${valores[valor]["idedificiohorario"]} aula ${valores[valor]["numeroaulahorario"]}`,"color:yellow;font-size:20px");          
            }
          }
        });
      }
    });
  }

}