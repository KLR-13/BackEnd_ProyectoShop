const bcrypt = require("bcrypt") /* ENCRIPTACIÓN DE CONTRASEÑAS */
const express = require("express")
const app = express()
const port = 3001
const cors = require("cors")
const { Productos, Usuarios } = require("./src/db.js")
app.use(express.json()); // Para peticiones con Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // Para peticiones con Content-Type: application/x-www-form-urlencoded
app.use(cors({
    origin: 'http://localhost:3000' // Cambia esto al origen de tu frontend
})); //Cors es una función, permite q se conecten 2 entidades, es decir, Back y Front.
const { conn } = require("./src/db.js")
const { where } = require("sequelize")

conn.sync({ force: false }).then(() => {// Ahora cuando hay un error, los objetos de la database se mantiene en vez de borrarse.
    app.listen(port, () => { console.log("funcionando") })
}).catch((error) => { console.log(error) })

app.get("/products", async (req, res) => { // el :id no es necesario.
    const productos = await Productos.findAll() //esperamos que encuentre y halle los productos con el await y el findAll.
/*     console.log (productos);
 */    res.status(200).send(productos) // Chequeamos si todo lo recibe bien, y acá los envía para el Front.
})



/* ------------------- PARTE PRODUCTDETAIL, PARA ENDPOINTS DE EDIT, DELETE, Y ENCONTRAR PRODUCTO CON ID------------------ */
app.get("/products/:id", async (req, res) => {
    const id = req.params.id //Identifica el ID de un producto
    const productos = await Productos.findOne({ where: { id: id } }) // En vez de hallar todos, hallamos uno. 
    /* NO TE OLVIDES DE WHERE PORQUE SI NO BORRÁS TODA LA DATABASE */
    res.send(productos)
    //En correlación con Productdetail en FE. Busca el producto según el ID, y ese ID será igual que el q entra x Params.
})

app.delete("/products/:id", async (req, res) => {
    const id = req.params.id
    const productos = await Productos.destroy({ where: { id: id } }) // Busca y destruye el producto seleccionado por su ID.
    res.sendStatus(200)

})

app.put("/products/edit/:id", async (req, res) => {
    const id= req.params.id
    const { Nombre, Descripción, Precio, imagenURL} = req.body
    console.log(req.body)
    const productos = await Productos.update({ Nombre: Nombre, Descripción: Descripción, Precio: Precio, imagenURL: imagenURL }, { where: { id: id } })
    res.sendStatus(200)
})

/* ------------------- PARTE PRODUCTDETAIL, PARA ENDPOINTS DE EDIT, DELETE, Y ENCONTRAR PRODUCTO CON ID------------------ */





app.post("/products", async (req, res) => { //el async siempre se pone cuando usamos await
    console.log(req.body)
    const { Nombre, Descripción, Precio, imagenURL } = req.body
    await Productos.create({ Nombre, Descripción, Precio, imagenURL });
    res.sendStatus(200)// en este no es necesario llamar a productos
})

app.post("/login", async (req, res) => { //Es para enviar los datos de usuario y contraseña al Front para el Login
    const { Contrasena, Email } = req.body
    const usuario = await Usuarios.findOne({ where: { Email } });

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    bcrypt.compare(Contrasena, usuario.Contrasena, (err, result) => {
        if (err) {
            console.error(err)
            return res.sendStatus(500)
        }
        if(result) {
            res.sendStatus(200)
    
        }
        else {
            console.log(Contrasena)
            console.log(usuario.Contrasena)
            res.status(401).json({error:"Contraseña incorrecta"})
        }
    })

})

/* ---------------ENCRIPTACIÓN CONTRASEÑA----------------- */

const saltrounds = 10 /* Son las rondas de encriptación */

/* ---------------ENCRIPTACIÓN CONTRASEÑA ----------------- */

app.post("/register", async (req, res) => { //Lo mismo que el Login
    const { Usuario, Email, Contrasena } = req.body
    bcrypt.hash(Contrasena, saltrounds, async (err, hash) => { /* Contrasena es lo que va encriptar, 
    saltrounds son las rondas que va a hacer. El hash es la encriptación */
        if (err) {
            console.error(err)
            return res.sendStatus(500)
        }
        await Usuarios.create({ Usuario, Email, Contrasena: hash }); // Llama al tipo de Modelo donde toma los datos, Usuarios en este caso.
        res.sendStatus(200)
    })
})