const { productos } = require('../models/product');

// Lista todos los productos para usuarios
exports.listarProductos = (req, res) => {
    console.log('Productos disponibles:', productos); // Para debuggear
    res.render('productos', {
        productos: productos,
        usuario: req.session.usuario
    });
};

// Muestra la vista de administración de productos
exports.mostrarAdminProductos = (req, res) => {
    if (!req.session.usuario || !req.session.usuario.esAdmin) {
        return res.redirect('/auth/login');
    }
    res.render('admin/productos', {
        productos: productos,
        layout: 'main'
    });
};

// Crear nuevo producto
exports.crearProducto = (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        nombre,
        precio: parseFloat(precio),
        descripcion
    };
    
    productos.push(nuevoProducto);
    console.log('Producto creado:', nuevoProducto); // Para debuggear
    res.redirect('/productos/admin');
};

// Editar producto
exports.editarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const index = productos.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        productos[index] = {
            ...productos[index],
            nombre,
            precio: parseFloat(precio),
            descripcion
        };
        console.log('Producto actualizado:', productos[index]); // Para debuggear
    }
    
    res.redirect('/productos/admin');
};

// Eliminar producto
exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        const productoEliminado = productos.splice(index, 1);
        console.log('Producto eliminado:', productoEliminado); // Para debuggear
    }
    
    res.redirect('/productos/admin');
};