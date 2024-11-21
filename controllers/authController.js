const { usuarios } = require('../models/user');

exports.mostrarLogin = (req, res) => {
  res.render('login', { layout: 'main' });
};

exports.iniciarSesion = (req, res) => {
  const { nombre, contraseña } = req.body;
  const usuario = usuarios.find(u => u.nombre === nombre && u.contraseña === contraseña);

  if (usuario) {
    req.session.usuario = usuario;
    res.redirect('/productos');
  } else {
    res.render('login', { 
      layout: 'main', 
      error: 'Credenciales incorrectas' 
    });
  }
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};