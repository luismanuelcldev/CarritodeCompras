const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware para verificar inicio de sesión
const verificarSesion = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }
  next();
};

// Middleware para verificar admin
const verificarAdmin = (req, res, next) => {
  if (!req.session.usuario || !req.session.usuario.esAdmin) {
    return res.redirect('/auth/login');
  }
  next();
};

router.post('/agregar', verificarSesion, cartController.agregarAlCarrito);
router.get('/', verificarSesion, cartController.mostrarCarrito);
router.get('/eliminar/:id', verificarSesion, cartController.eliminarDelCarrito);
router.get('/procesar', verificarSesion, cartController.procesarCompra);
router.get('/compras', verificarAdmin, cartController.mostrarCompras);

module.exports = router;