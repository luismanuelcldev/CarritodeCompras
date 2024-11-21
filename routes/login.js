const express = require('express');
const router = express.Router();

// Página de inicio de sesión
router.get('/', (req, res) => {
  res.render('login', {
    titulo: 'Iniciar Sesión',
  });
});

// Procesar inicio de sesión
router.post('/', (req, res) => {
  const { usuario, password } = req.body;
  if (usuario === 'admin' && password === '1234') {
    req.flash('mensaje_exito', 'Inicio de sesión exitoso');
    res.redirect('/carrito');
  } else {
    req.flash('mensaje_error', 'Usuario o contraseña incorrectos');
    res.redirect('/');
  }
});

module.exports = router;
