const Tareas= require('../models/Tareas')
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req,res,next)=>{
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({ where:{url: req.params.url}})
    //leer el valor del input
    const {tarea}= req.body;
    //asignar el estado de la tarea
    const estado= 0;
    // Id del proyecto
    const proyectoId = proyecto.id


  let errores =[];

  if (!tarea){
    errores.push({'texto':'Agrega un Nombre a la tarea '})
  }
  //si hay errores
  if (errores.length>0){
    res.render('nuevoProyecto',{
      nombrePagina: 'Nuevo Proyecto',
      errores,
      proyectos
    })
  }else{
    //insertar en la bd
    
    const resultado =  await Tareas.create({tarea,estado,proyectoId});
  
    if(!resultado){
        return next();
    }
      res.redirect(`/proyectos/${req.params.url}`)
  }
}

exports.cambiarEstadoTarea = async (req,res,next)=>{
  const {id}=req.params;
  const tarea= await Tareas.findOne({where:{id}})
  let estado= 0
  if(tarea.estado===estado){
    estado= 1
  }
  tarea.estado=estado
  const resultado = await tarea.save();

  if(!resultado)return next()

  res.status(200).send('Actualizado')
}

exports.eliminarTarea= async(req,res,next)=>{
 
  const {id}= req.params
  const resultado = await Tareas.destroy({where:{id}});
 
 if(!resultado){
  return next();
}
 
 res.status(200).send('Tarea Eliminada Correctamente')
 
 
}