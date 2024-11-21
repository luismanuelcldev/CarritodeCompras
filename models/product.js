class Producto {
    constructor(id, nombre, precio, descripcion) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.descripcion = descripcion;
    }
  }
  
  const productos = [
    new Producto(1, 'Laptop', 500, 'Laptop de última generación'),
    new Producto(2, 'Teléfono', 300, 'Smartphone con buenas características'),
    new Producto(3, 'Tablet', 200, 'Tablet para entretenimiento')
  ];
  
  module.exports = {
    Producto,
    productos
  };