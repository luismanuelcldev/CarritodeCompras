const { productos } = require('../models/product');

// Almacén de compras realizadas
const comprasRealizadas = [];

exports.agregarAlCarrito = (req, res) => {
  const { id, cantidad } = req.body;
  const producto = productos.find(p => p.id === parseInt(id));

  if (producto) {
    if (!req.session.carrito) {
      req.session.carrito = [];
    }

    const itemExistente = req.session.carrito.find(item => item.producto.id === parseInt(id));

    if (itemExistente) {
      itemExistente.cantidad += parseInt(cantidad);
    } else {
      req.session.carrito.push({
        producto,
        cantidad: parseInt(cantidad)
      });
    }
  }

  res.redirect('/productos');
};

exports.mostrarCarrito = (req, res) => {
  const carrito = req.session.carrito || [];
  const total = carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);

  res.render('carrito', { 
    carrito, 
    total 
  });
};

exports.eliminarDelCarrito = (req, res) => {
  const { id } = req.params;
  
  if (req.session.carrito) {
    req.session.carrito = req.session.carrito.filter(
      item => item.producto.id !== parseInt(id)
    );
  }

  res.redirect('/carrito');
};

exports.procesarCompra = (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }

  const compra = {
    usuario: req.session.usuario.nombre,
    productos: req.session.carrito,
    fecha: new Date()
  };

  comprasRealizadas.push(compra);
  req.session.carrito = [];

  res.redirect('/productos');
};

exports.mostrarCompras = (req, res) => {
  if (!req.session.usuario || !req.session.usuario.esAdmin) {
    return res.redirect('/auth/login');
  }

  res.render('admin/compras', { 
    compras: comprasRealizadas, 
    layout: 'main' 
  });
};