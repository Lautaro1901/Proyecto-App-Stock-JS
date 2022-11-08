// FUNCIONES//
function mostrarProducto(obj_producto){
    const contenedorProductos = document.getElementById('ListaProductos');
    const productoNuevo = document.createElement('tr');
    productoNuevo.innerHTML = 
    `<th scope="row">${obj_producto.id}</th>
    <td>${obj_producto.nombre}</td>
    <td>${obj_producto.desc}</td>
    <td>${obj_producto.stock}</td>
    <td>${obj_producto.deposito}</td>`;
    contenedorProductos.append(productoNuevo);
}

// Clases //
class Producto {
    constructor (id, nombre, desc, stock, deposito){ 
        this.id = id;
        this.nombre = nombre;
        this.desc = desc;
        this.stock = stock;
        this.deposito = deposito;
    }

    sumarStock(cantidad){
        this.stock += cantidad
    }
    restarStock(cantidad){
        this.stock -= cantidad
        if (this.stock < 0){this.stock = 0}
    }
}

// Listado Productos 
class Sistema{
    constructor(){
        this.productos = [];
    }
    agregarProducto(nombre, desc, stock, deposito){
        let id = 1 
        if (this.productos.length > 0){
            id = this.productos[this.productos.length - 1].id + 1
        }
        this.productos.push(new Producto(id, nombre, desc, stock, deposito))
    }
    vistaProductos (){
        this.productos.forEach((prod) => mostrarProducto(prod));
    }
    traerProducto(id){
        return this.productos.find((prod)=>prod.id === id)
    }
}

const sistema = new Sistema ()
sistema.agregarProducto ("Cande", "Mide 1.50", 1,"Nueva Pompeya")
sistema.agregarProducto ("Candela", "Mide 1.40", 2,"Pitufilandia")
sistema.agregarProducto ("Kmde", "Mide 1.49", 5,"Casa de Teddy")
sistema.agregarProducto ("Pablo", "Progamador", 10, "Rafael Calzada")

sistema.traerProducto(1).restarStock(2)
sistema.agregarProducto (prompt("Ingrese un nombre"), prompt("Ingrese Desc"), prompt("Ingrese stock"),prompt("Ingrese un deposito"))
sistema.vistaProductos()