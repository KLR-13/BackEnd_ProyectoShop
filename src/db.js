const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");


const sequelize = new Sequelize("proyecto", "root", "", {
  logging: false, // true para ver logs de creacion de tablas y otro
  dialect: "mysql",
  port: 3306
  // dialectOptions: {
  //   mysql2: "^2.3.3",
  // },
});


const basename = path.basename(__dirname);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// console.log(sequelize.models);
//todo relations
const {
  Usuarios,
  Orden,
  Productos,
} = sequelize.models;

// HasMany= Tiene muchos
// BelongsTo= Pertenece a
// BelongsToMany= Pertenece a muchos
// HasOne= Tiene uno

Orden.belongsTo(Usuarios);
Usuarios.hasMany(Orden);
Orden.belongsToMany(Productos,{through:"ordenproductos"}); // Tabla intermedia, tiene los Foreign Key de uno y de otro solo
Productos.belongsToMany(Orden,{through:"ordenproductos"}); // Tabla intermedia, tiene los Foreign Key de uno y de otro solo

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

/* // {"Nombre": "Zapatilla Nike fachera 2012",
"Descripción": "Unas zapas que te hacen sentir como Ricardo Fort",
"Precio": 2500,
"imagenURL": "https://acdn.mitiendanube.com/stores/002/801/569/products/c84d532df507985320506a2e25b84683a27cec48caeb9030dc5f7a35e04c28d51731351-5059254c7ae368b9b916748926028208-640-01-395f9094715f217fd316751912537486-640-0.png"
} */