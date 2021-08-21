const passport = require('passport')
const Usuarios= require('../models/Usuarios')


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
    
})

//funcion para revisar si el usuario esta logeado o no

exports.usuarioAutenticado =  (req,res,next)=>{
    //si el usuario esta autenticado , adelante

    if(req.isAuthenticated()){
        return next()
    }


    // si no esta autenticado redirigir al formulario 
    return res.redirect('/iniciar-sesion')
}

exports.cerrarSesion=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}

exports.enviarToken= async (req,res)=>{
    req.flash('error', "No existe esa cuenta")
        const usuario= await Usuarios.findOne({
            where:{email:req.body.email}
             });
  if(!usuario){res.render('reestablecer', res.render('reestablecer',{
    nombrePagina: 'Reestablecer password',
    mensajes:req.flash()
    
  }))}
}