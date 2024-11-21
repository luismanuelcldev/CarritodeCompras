const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de sesión
app.use(session({
  secret: 'secreto_carrito_compras',
  resave: false,
  saveUninitialized: true
}));

// Motor de plantillas Handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    suma: (a, b) => a + b,
    multiplicar: (a, b) => a * b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Variables globales de middleware
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  res.locals.carrito = req.session.carrito || [];
  next();
});

// Rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
app.use('/carrito', cartRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect('/productos');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});