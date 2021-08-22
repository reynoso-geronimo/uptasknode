const passport = require('passport')
const LocalStrategy= require('passport-local').Strategy;

//referencia al modelo a autenticar 

const Usuarios = require('../models/Usuarios')

//local strategy - login con credenciales propias
passport.use(
    new LocalStrategy(
        //[pr default passport espera un usuario y password
        {
            usernameField:'email',
            passwordField:'password'
        },
        async (email, password, done)=>{
            try {
                const usuario= await Usuarios.findOne({
                    where:{
                        email,
                        activo:1
                    }
                });
                //el usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }
                // email existe y password correcto
                    return done(null,usuario);
            } catch (error) {
                //ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);
//serializar el usuaruio
passport.serializeUser((usuario, callback)=>{
    callback(null,usuario);
})
// deserializar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null,usuario);
})

//exportar

module.exports = passport
