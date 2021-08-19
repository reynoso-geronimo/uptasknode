const express =require('express');
const routes= require('./routes');
const path=require('path')
const flash=  require ('connect-flash');

//helpers con algunas funciones

const helpers =  require('./helpers');


//crear la conexion a la db

const db = require('./config/db');
//importar el modelo
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')


db.sync()
    .then(()=>console.log('conectado al servidor'))
    .catch(error=>console.log(error))

//crear una app de express

const app= express();

//habilitar el body parseer
app.use(express.urlencoded({extended:true}));

//donde cargar los archivos estaticos.

app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug')

//carpeta de las vistas
app.set('views',path.join(__dirname, './views'));


//agregar flash messages
app.use(flash());

//pasar vardump a la aplicacion
app.use((req,res, next)=>{
    res.locals.vardump = helpers.vardump;
    next();
})

app.use('/',routes())



app.listen(3000);
