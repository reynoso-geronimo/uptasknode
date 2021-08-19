import axios from "axios"
import Swal from "sweetalert2"
import {acutalizarAvance} from '../funciones/avance'

const tareas=document.querySelector('.listado-pendientes')

if (tareas){
    tareas.addEventListener('click',e=>{
        if(e.target.classList.contains('fa-check-circle')){
            console.log("actualizando")
            const icono=e.target
            const idTarea=icono.parentElement.parentElement.dataset.tarea;
            console.log(idTarea)
            //req hacia '/tareas/:id'
            const url = `${location.origin}/tareas/${idTarea}`
            console.log(url)
            axios.patch(url,{idTarea})
                .then(function(respuesta){
                    if(respuesta.status===200){
                        icono.classList.toggle('completo');
                        acutalizarAvance();
                    }
                })

        }
        if(e.target.classList.contains('fa-trash')){
          
            const tareaHtml=e.target.parentElement.parentElement
            
            const idTarea=tareaHtml.dataset.tarea;
            
            Swal.fire({
                title: 'Estas Seguro?',
                text: "Esto es permanente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText:'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    //enviar peticion a axios
                    const url = `${location.origin}/tareas/${idTarea}`
                    axios.delete(url,{params: {idTarea}})
                        .then(function(respuesta){
                            if(respuesta.status===200){
                                tareaHtml.parentElement.removeChild(tareaHtml)
                                //opcional una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                  )
                                  acutalizarAvance();
                            }
                            
                           
                        })
                        .catch(()=>{
                          Swal.fire({
                            type:'error',
                            titlte:'hubo un error',
                            text: ' No se pudo elminar la Tarea'
                          })
                        })
                 
                }
              })






      
        }
    })

}

export default tareas