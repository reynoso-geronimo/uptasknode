const express =require('express');
const routes= require('./routes');
const path=require('path')
const flash=  require ('connect-flash');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require ('./config/passport')
require ('dotenv').config({path:'variables.env'})
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

app.use(cookieParser())

//agregar flash messages
app.use(flash());


//sesiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret:'supersecreto',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
//pasar vardump a la aplicacion
app.use((req,res, next)=>{
    
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario ={...req.user}|| null;
 
    next();
})

app.use('/',routes())


//servidor y puerto

const host =process.env.HOST|| '0.0.0.0';
const port =process.env.port|| 3000
app.listen(port, host, ()=>{
    console.log('el servidor esta funcionando')
});
