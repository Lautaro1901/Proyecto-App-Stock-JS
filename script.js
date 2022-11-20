// FUNCIONES//
const contenedorProductos = document.getElementById('TablaProductos');
function mostrarProducto(obj_producto){
    const productoNuevo = document.createElement('tr');
    productoNuevo.innerHTML = 
    `<th scope="row">${obj_producto.id}</th>
    <td>${obj_producto.nombre}</td>
    <td>${obj_producto.desc}</td>
    <td>${obj_producto.stock}</td>
    <td>${obj_producto.deposito}</td>`;
    contenedorProductos.append(productoNuevo);
}

function actualizarSelectProd(){
    selectElementEliminar.innerText = ''
    sistema.productos.forEach(prod=>{
        const opcionProducto = document.createElement('option')
        opcionProducto.innerText = `${prod.nombre}`
        selectElementEliminar.append(opcionProducto)
    })
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
    guardar(){
        localStorage.setItem('productos', JSON.stringify(this.productos))
    }
    vistaProductos (){
        contenedorProductos.innerHTML = ''
        this.productos.forEach((prod) => mostrarProducto(prod));
    }
    traerProducto(id){
        return this.productos.find((prod)=>prod.id === id)
    }
}

const sistema = new Sistema ()
const btnAgregar = document.getElementById('btnAgregar')

//Evento agregar Producto 
    btnAgregar.onclick = () => {
    const inputNombre = document.getElementById('nombreProducto')
    const inputDesc = document.getElementById('descProducto')
    const inputDeposito = document.getElementById('depositoProducto')
    const inputStock = document.getElementById('stockProducto')
    
    sistema.agregarProducto (inputNombre.value, inputDesc.value,parseInt(inputStock.value), inputDeposito.value)
    
    inputNombre.value = inputDesc.value = inputStock.value = inputDeposito.value = '' 

    sistema.guardar()
    sistema.vistaProductos()
}

const productosAlmacenados = JSON.parse(localStorage.getItem('productos'))
productosAlmacenados.forEach((p)=>sistema.agregarProducto(p.nombre,p.desc,p.stock,p.deposito))
sistema.vistaProductos()

// Evento eliminar producto
const selectElementEliminar = document.getElementById('listaProductos')
const btnEliminar = document.getElementById('btnBorrar')
const btnEliminarNav = document.getElementById('btnEliminarNav')

btnEliminarNav.onclick = actualizarSelectProd 

btnEliminar.onclick = ()=>{
    sistema.productos.splice(selectElementEliminar.selectedIndex, 1)
    sistema.guardar()
    sistema.vistaProductos()
    actualizarSelectProd ()
}

//Evento Actualizar Stock 
const selectActualizarStock = document.getElementById('selectActualizarStock')
const btnActualizarStock = document.getElementById('btnActualizarStock')

btnActualizarStock.onclick = () => {
    selectActualizarStock.innerText = ''
    sistema.productos.forEach(prod=>{
        const opcionProducto = document.createElement('option')
        opcionProducto.innerText = `${prod.nombre}`
        selectActualizarStock.append(opcionProducto)
    })
}

const btnSumarStock = document.getElementById('btnSumarStock')
const btnRestarStock = document.getElementById('btnRestarStock')
const stockCantidad = document.getElementById('stockCantidad')

btnSumarStock.onclick = () => {
    sistema.productos [selectActualizarStock.selectedIndex].sumarStock(parseInt(stockCantidad.value))
    sistema.vistaProductos()

}

btnRestarStock.onclick = () => {
    sistema.productos[selectActualizarStock.selectedIndex].restarStock(parseInt(stockCantidad.value))
    sistema.vistaProductos()

}