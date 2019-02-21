let coche = require('./cocheModelo')

// LISTAR UN COCHE POR ID
function getCoche(req,res){
    let idCoche = req.params.id
    coche.findById(idCoche).then(
        cocheEncontrado=>{ 
            if(!cocheEncontrado){
                res.status(404).send({accion:'getAll',mensaje:'No hay coches'})
        }else{ 
            res.status(200).send({accion:'get',data:cocheEncontrado})}
        }
    ).catch(err=>{res.status(500).send({accion:'getAll',mensaje:'Problema al leer el coche'})})
   
}

 // LISTAR TODOS LOS COCHES
function getCoches(req,res){
    // MODELO ANTIGUO CON CALLBACK
    /*coche.find().exec((err,coches)=>{
        if(err){
        res.status(500).send({accion:'getAll',mensaje:'Problema al leer los coches'})
        }else if(!coches){
            res.status(404).send({accion:'getAll',mensaje:'No hay coches'})
        }else{
            res.status(200).send({accion:'getAll',data:coches})
        }
    })*/
    // MODELO MODERNO CON PROMESAS
    // el exec se utiliza cuando la funcion find() por ejemplo no es final si no que se pueden hacer mas cosas como .group()
    coche.find().exec().then(
        (coches)=>{
            if(!coches){
                res.status(404).send({accion:'getAll',mensaje:'No hay coches'})
            }else{
                res.status(200).send({accion:'getAll',data:coches}) 
            }
        }
    ).catch(
        ()=>{res.status(500).send({accion:'getAll',mensaje:'Problema al leer los coches'})}
    )       
}
    // INSERTAR COCHES
function saveCoche(req,res){
    let param = req.body
    let ncoche = new coche();
    //ncoche._id = param._id
    ncoche.nombre = param.nombre
    ncoche.modelo = param.modelo
    ncoche.precio = param.precio
    ncoche.save().then(
        cocheGuardado=>{
            res.status(200).send({accion:'save',data:cocheGuardado})
        }
    ).catch(
        err=>{res.status(500).send({accion:'save',mensaje:'Problema al guardar el coche '+err})}
    )       
}


function updateCoche(req,res){
    let idCoche = req.params.id
    let param = req.body
    // {new:true} devuelve el nuevo actualizado
    coche.findOneAndUpdate(idCoche,param,{new:true}).then(
        cocheActualizado=>{
            res.status(200).send({accion:'update',data:cocheActualizado})
        }
    ).catch(
        err =>{
            err=>{res.status(500).send({accion:'update',mensaje:'Problema al updatear el coche '+err})}
        }
    )
}

function deleteCoche(req,res){
let idCoche = req.params.id
coche.findByIdAndDelete(idCoche).then(
    cocheBorrado=>{
        res.status(200).send({accion:'delete',data:cocheBorrado})
    }
).catch(
    err =>{
        err=>{res.status(500).send({accion:'update',mensaje:'Problema al borrar el coche '+err})}
    }
)
res.status(200).send({accion:'delete',data:idCoche})
}

// exportar para que se puedan utilizar
module.exports = {getCoche,getCoches,saveCoche,deleteCoche,updateCoche}