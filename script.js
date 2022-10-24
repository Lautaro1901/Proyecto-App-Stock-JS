// VARIABLES DE STOCK DE PRODUCTO
let producto1 = 5;
let producto2 = 7;
let producto3 = 3;

let opcion;
while(opcion != "5"){
    opcion = prompt('Eliga la opcion\n1. Sumar Stock\n2. RestarStock\n3. Mostrar producto\n4. Mostrar todos los productos\n5. Salir');
    while(opcion < 1 || opcion > 5){
        alert("Error opcion invalida vuelva a ingresar una opcion");
        opcion = prompt('Eliga la opcion\n1. Sumar Stock\n2. RestarStock\n3. Mostrar producto\n4. Mostrar todos los productos\n5. Salir');
    }
    
    if(opcion >= 1 && opcion <= 3){
        let producto = prompt('1.Producto1 \n2.Producto2 \n3.Producto3');
        while(producto < 1 || producto > 3){
            alert("Error opcion invalida vuelva a ingresar una opcion");
            producto = prompt('1.Producto1 \n2.Producto2 \n3.Producto3');
        }
        if(opcion == "1" || opcion == "2"){
            let cantidad = prompt('Ingrese cantidad');
            actualizacionDeStock(opcion, producto, cantidad);
        }
        alert("Cantidad actual del producto: " + obtenerStockProducto(producto));
    }else if(opcion == "4"){
        mostrarStockProductos();
    }
}

function actualizacionDeStock(opcion, productoElegido, cantidad){
    cantidad = parseInt(cantidad);
    if (opcion == "1") {    // AÑADIR STOCK
        switch (productoElegido){
            case "1":
                producto1 += cantidad;
                break;
    
            case "2":
                producto2 += cantidad;
                break;
    
            case "3":
                producto3 += cantidad;
                break;
        }
    }else{  // RESTAR STOCK
        switch (productoElegido){
            case "1":
                producto1 -= validarRestarStock(producto1, cantidad);
                break;
    
            case "2":
                producto2 -= validarRestarStock(producto2, cantidad);
                break;
    
            case "3":
                producto3 -= validarRestarStock(producto3, cantidad);
                break;
        }
    }
}

function validarRestarStock(stock, cantidad){
    if(stock >= cantidad){
        return (cantidad);
    }else{
        return stock;
    }
}

function obtenerStockProducto(productoElegido){
    switch (productoElegido){
        case "1":
            return producto1;
            break;

        case "2":
            return producto2;
            break;

        case "3":
            return producto3;
            break;
    }
}

function mostrarStockProductos(){
    alert("Stock Disponible\n Producto 1: " + producto1
    + "\n Producto 2: " + producto2
    + "\n Producto 3: " + producto3);
}