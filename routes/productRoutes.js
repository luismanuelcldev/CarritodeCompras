const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware para verificar admin
const verificarAdmin = (req, res, next) => {
  if (!req.session.usuario || !req.session.usuario.esAdmin) {
    return res.redirect('/auth/login');
  }
  next();
};

router.get('/', productController.listarProductos);
router.get('/admin', verificarAdmin, productController.mostrarAdminProductos);
router.post('/crear', verificarAdmin, productController.crearProducto);
router.post('/editar/:id', verificarAdmin, productController.editarProducto);
router.get('/eliminar/:id', verificarAdmin, productController.eliminarProducto);

module.exports = router;