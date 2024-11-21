class Usuario {
    constructor(nombre, contraseña, esAdmin = false) {
      this.nombre = nombre;
      this.contraseña = contraseña;
      this.esAdmin = esAdmin;
    }
  }
  
  // Lista de usuarios
  const usuarios = [
    new Usuario('admin', 'admin', true),
    new Usuario('usuario1', '123')
  ];
  
  module.exports = {
    Usuario,
    usuarios
  };