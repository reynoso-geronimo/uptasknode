const Sequelize = require ('sequelize')

const db = require ('../config/db')
const Proyectos = require('./Proyectos')
const bcrypt = require('bcrypt')
const Usuarios = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg:'Agrega un Correo valido'
            },
            notEmpty:{
                msg:'El Email no puede ir vacio'
            }
        },
        unique:{
            args:true,
            msg:'Usuario ya Registrado'
        },
        

    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El Password no puede ir vacio'
            }
        }
    },
    

},
    {
        hooks:{
            beforeCreate(usuario){
                usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            }
        }
    }
);
Usuarios.hasMany(Proyectos)

module.exports = Usuarios;
