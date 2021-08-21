const passport = require('passport')
const Usuarios= require('../models/Usuarios')
const crypto= require('crypto')

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
    
        const usuario= await Usuarios.findOne({
            where:{email:req.body.email}
             });
  if(!usuario){
    req.flash('error', "No existe esa cuenta")
    res.redirect('/reestablecer')
}

    //usuario existe
    //token y expiracion
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    //guardar en la base de datos
    await usuario.save();

    //url de reset

    const reseturl= `http://${req.headers.host}/reestablecer/${usuario.token}`
    console.log(reseturl)
}
exports.resetPassword=async (req,res)=>{
    res.json(req.params.token)
}