const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const enviarEmail= require('../handler/email')

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos Campos son Obligatorios",
});

//funcion para revisar si el usuario esta logeado o no

exports.usuarioAutenticado = (req, res, next) => {
  //si el usuario esta autenticado , adelante

  if (req.isAuthenticated()) {
    return next();
  }

  // si no esta autenticado redirigir al formulario
  return res.redirect("/iniciar-sesion");
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

exports.enviarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { email: req.body.email },
  });
  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/reestablecer");
  }

  //usuario existe
  //token y expiracion
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000;
  //guardar en la base de datos
  await usuario.save();

  //url de reset

  const reseturl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
  //envia el correo con el token
  await enviarEmail.enviar({
    usuario,
    subject: 'Password Reset',
    reseturl,
    archivo: 'reestablecer-password'
  })
};
exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  // si no encuentro al usuario
  if (!usuario) {
    req.flash("error", "No Valido");
    res.redirect("/reestablecer");
  }
  //formulario para resetear el password
  res.render("resetPassword", {
    nombrePagina: "Reestablecer Contraseña",
  });
};
// cambia el passowrd pornuno nuevo
exports.actualizarPassword = async (req, res) => {
  //verifica un token valido pero tambien la fecha de expiracion
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gt]: Date.now(),
      },
      //veriificar si el usuario existe
    },
  });
  console.log(usuario);
  if (!usuario) {
    req.flash("error", "No Valido");
    res.redirect("/reestablecer");
  }
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;
  //guardiamos el nuevo password
  await usuario.save();
  req.flash('correcto', 'tu password se modifico')
  res.redirect('/iniciar-sesion')

};
