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
  router.get("/",proyectosController.proyectosHome );
  router.get('/nuevo-proyecto',proyectosController.formularioProyecto)
  router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape() ,proyectosController.nuevoProyecto)

  //listar proyecto
  router.get('/proyectos/:url',proyectosController.proyectoPorUrl)

  //actualizar el proyecto
  router.get('/proyecto/editar/:id', proyectosController.formularioEditar)
  router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape() ,proyectosController.actualizarProyecto)
  // eliminar proyecto
  router.delete('/proyectos/:url', proyectosController.eliminarProyecto)


  //tareas
  router.post('/proyectos/:url',tareasController.agregarTarea)

  //actualizar tarea

  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)
  router.delete('/tareas/:id', tareasController.eliminarTarea)
  
  //crear nueva cuenta

  router.get('/crear-cuenta', usuariosController.formCrearCuenta)
  router.post('/crear-cuenta', usuariosController.CrearCuenta)
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
  router.post('/iniciar-sesion', authController.autenticarUsuario)
  return router;
};
