const sequelize = require('sequelize')
const slug = require('slug')
const db = require ('../config/db')
const shortid = require('shortid')

const Proyectos = db.define('proyectos',{
    id : {
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    
    nombre:sequelize.STRING(100),
    

    url:sequelize.STRING(100),
}, {
    hooks:{
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLocaleLowerCase();      
            
            proyecto.url= `${url}-${shortid.generate()}`
            console.log(proyecto.url)
        }
    }
});

module.exports = Proyectos