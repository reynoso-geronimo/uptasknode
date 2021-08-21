const express = require("express");
const router = express.Router();

//importar express validator

const {body} = require('express-validator')

const proyectosController= require('../controllers/proyectosController')
const tareasController=require('../controllers/tareasController')
const usuariosController=require('../controllers/usuariosController')
const authController= require('../controllers/authController')

module.exports = function () {
  //ruta para el home
  router.get("/",
    authController.usuarioAutenticado,
    proyectosController.proyectosHome );
  router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto)
  router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape() ,proyectosController.nuevoProyecto)

  //listar proyecto
  router.get('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl)

  //actualizar el proyecto
  router.get('/proyecto/editar/:id', 
    authController.usuarioAutenticado,
    proyectosController.formularioEditar)
  router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape() ,proyectosController.actualizarProyecto)
  // eliminar proyecto
  router.delete('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto)


  //tareas
  router.post('/proyectos/:url',authController.usuarioAutenticado,tareasController.agregarTarea)

  //actualizar tarea

  router.patch('/tareas/:id', authController.usuarioAutenticado,tareasController.cambiarEstadoTarea)
  router.delete('/tareas/:id', authController.usuarioAutenticado,tareasController.eliminarTarea)
  
  //crear nueva cuenta

  router.get('/crear-cuenta', usuariosController.formCrearCuenta)
  router.post('/crear-cuenta', usuariosController.CrearCuenta)
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
  router.post('/iniciar-sesion', authController.autenticarUsuario)

  router.get('/cerrar-sesion',authController.cerrarSesion)
  
  //reestabelcer conbtraseña
  router.get('/reestablecer',usuariosController.formReestablecerPassword)

  router.post('/reestablecer',authController.enviarToken)

  router.get('/reestablecer/:token', authController.resetPassword)
  return router;
};
