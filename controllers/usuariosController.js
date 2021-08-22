const Usuarios = require("../models/Usuarios");
const enviarEmail= require('../handler/email')

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear Cuenta en uptask",
  });
};
exports.crearCuenta = async (req, res) => {
  //leer los datos

  const { email, password } = req.body;
  try {
    await Usuarios.create({
      email,
      password,
    });
    //crear una url de confirmar
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    //crear el objeto de usuario
    const usuario ={
      email
    }
    //enviar email
    await enviarEmail.enviar({
      usuario,
      subject: 'Confirmar tu cuenta',
      confirmarUrl,
      archivo: 'confirmar-cuenta'
    })


    //redirigir al susuario
    req.flash('correcto', 'Enviamos un correo confirma tu cuenta')
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash('error',error.errors.map(error=>error.message))
    res.render("crearCuenta", {
        mensajes: req.flash(),
      nombrePagina: "Crear Cuenta en uptask",
      email,
      password
    });
  }
};

exports.formIniciarSesion = (req, res) => {
  const {error}=  res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Inicia Sesion",
    error
  });
};

exports.formReestablecerPassword =(req,res)=>{
  res.render('reestablecer',{
    nombrePagina: 'Reestablecer password'
    
  })
}
//cambia el estado de una cuenta
exports.confirmarCuenta= async (req, res)=>{
  const usuario= await Usuarios.findOne({where:{email:req.params.email}})
  if(!usuario){
    req.flash('error', 'No valido');
    res.redirect('/Crear-Cuenta')
  }
  usuario.activo=1
  await usuario.save();
    req.flash('correcto', 'Cuenta activada')
    res.redirect('/iniciar-sesion')
}