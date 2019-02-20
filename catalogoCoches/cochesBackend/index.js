/* 
    * npm install express --save
    * npm install body-parser --save
    * npm install -D -g nodemon 
    * npm install mongoose
 
    */

let express = require('express')
// bodyparser => Hace que en vez de trabajar con strings, trabajes con objetos json
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cocheController = require('./cocheController')



let puerto = 7777

let app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// midle ware
app.use( (req, res, next) => {
	//permitimos que las peticiones se puedan hacer desde cualquier sitio
	res.header('Access-Control-Allow-Origin', '*')
	//res.header('Access-Control-Allow-Origin', '192.168.0.11')
	// configuramos las cabeceras que pueden llegar
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
	// configuramos los métodos que nos pueden llegar
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
	next(); // para que se salga de esta función
})



// res => respuesta | req => lo que viene como por ejemplo parametros
// pruebas
/*
app.get('/prueba',(req,res)=>{
res.status(200).send("Hola David que tal")
})
app.get('/prueba/:nombre',(req,res)=>{
let nombre = req.params.nombre
res.status(200).send("Hola que tal " + nombre)
})
app.get('/saluda/:nombre?',(req,res)=>{
    let nombre
    if(req.params.nombre){
       nombre = req.params.nombre

    }else{
         nombre = 'anonimo'
    }
    res.status(200).send("Hola " + nombre)
})
app.get('/datos',(req,res)=>{
    res.status(200).send({datos:[1,2,3],mensaje:'hola',valor:122342})
})
*/

// pedir algo por get, borrar por delete, poner algo por post

app.get('/coche/:id',cocheController.getCoche)
app.get('/coches',cocheController.getCoches)
app.post('/coche',cocheController.saveCoche)
app.put('/coche/:id',cocheController.updateCoche) // esto es el UPDATE
app.delete('/coche/:id',cocheController.deleteCoche)


// esto es como el conector de mysql en java FORMA VIEJA
/*mongoose.connect('mongodb://localhost:27017/coches',(err,res)=>{
if(err){
    console.log('Fallo en base de datos' + err)
    throw err
}else{
    console.log('Conexion con mongo correcta')
    // aqui se pone a escuchar el puerto
    app.listen(puerto,()=>{
        console.log('Bienvenido, el servidor se arranco correctamente')
    })
}
})*/

// FORMA MODERNA USAR ESTA
mongoose.connect('mongodb://localhost:27017/coches',{useNewUrlParser: true }).then(
    ()=>{
        console.log('Conexion con mongo correcta')
        app.listen(puerto,()=>{
            console.log('Bienvenido, el servidor se arranco correctamente')
        })
    },
    err => {
        console.log('fallo en la base de datos ' + err)
    }

)
