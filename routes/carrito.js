const express = require('express');
const router = express.Router();

// Página del carrito de compras
router.get('/', (req, res) => {
  res.render('carrito', {
    titulo: 'Carrito de Compras',
  });
});

// Agregar producto al carrito
router.post('/agregar', (req, res) => {
  const { producto, cantidad } = req.body;
  req.flash('mensaje_exito', `Producto "${producto}" agregado con éxito`);
  res.redirect('/carrito');
});

// Vaciar el carrito
router.post('/vaciar', (req, res) => {
  req.flash('mensaje_exito', 'Carrito vaciado con éxito');
  res.redirect('/carrito');
});

module.exports = router;
