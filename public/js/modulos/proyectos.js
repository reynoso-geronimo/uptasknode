import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#elminar-proyecto')


if(btnEliminar){
    btnEliminar.addEventListener('click',e=>{
        const urlProyecto = e.target.dataset.proyectoUrl;
        
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
                const url = `${location.origin}/proyectos/${urlProyecto}`
                axios.delete(url,{params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta)
                        Swal.fire(
                          'Eliminada',
                          respuesta.data,
                          'success'
                        )
                        //redireccionar al inicio
                        setTimeout(() => {
                            window.location.href='/'
                        }, 3000);
                    })
                    .catch(()=>{
                      Swal.fire({
                        type:'error',
                        titlte:'hubo un error',
                        text: ' No se pudo elminar el Proyecto'
                      })
                    })
             
            }
          })
    
    })
}
export default btnEliminar;
