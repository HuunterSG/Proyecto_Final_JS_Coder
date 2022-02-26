/*
Segunda pre-entrega creando tienda de skins
creamos una seccion de inicio de sesion
mostramos las skins que tenemos en venta
producimos el codigo para lograr la compra del mismo
luego lo sumamos en un carrito guardandolo en el storage
utilizamos dom para crear la seccion de tarjetas con nuestros 
productos

Recurrimos a la utilizacion de jquery para hacer el metodo 
eliminar productos de nuestro carrito debido a que no 
logro hacerlo mediante vanilla y en el after me quedo mas 
claro utilizando esta forma
*/

//Tengo problemas para darle estilos a las tablas esa es la razon por el cual tengo la pagina tan simple

//creamos clase constructora con los metodos a utilizar
class Skin {
    constructor(skin, cantidad) {
        this.id = skin.id;
        this.campeon = skin.campeon;
        this.descripcion =skin.descripcion;
        this.precio = skin.precio;
        this.cantidad = cantidad;
        this.precioTotal= skin.precio;
    }
    agregarUnidad(){
        this.cantidad++;
    }
    quitarUnidad(){
        this.cantidad--;
    }
    actualizarPrecioTotal(){
        this.precioTotal= this.precio * this.cantidad;
    }
}

//declaramos variables. nuestro array y carrito
const skins= [
    {
        id: 0,
        campeon: "Ahri",
        descripcion: "Bosque Viejo",
        precio: 1350,
        img: "./img/ahribosqueviejo.png"
    },
    {
        id: 1,
        campeon: "Jinx",
        descripcion: "Arcane",
        precio: 850,
        img: "./img/jinxarcane.png"
    },
    {
        id: 2,
        campeon: "Leona",
        descripcion: "Parrillera",
        precio: 450,
        img: "./img/leonaparrillera.png"
    },
    {
        id: 3,
        campeon: "Leona",
        descripcion: "Reinos Mecha",
        precio: 1350,
        img: "./img/leonareinosmecha.png"
    },
    {
        id: 4,
        campeon: "Leona",
        descripcion: "Proyecto",
        precio: 1350,
        img: "./img/leonaproyecto.png"
    },
    {
        id: 5,
        campeon: "Nautilus",
        descripcion: "Pergaminos de Shang Hai",
        precio: 1350,
        img: "./img/nautipergaminosdeshanghai.png"
    },
    {
        id: 6,
        campeon: "Nautilus",
        descripcion: "Protector",
        precio: 720,
        img: "./img/nautiprotector.png"
    },
    {
        id: 7,
        campeon: "Sona",
        descripcion: "Corazoncito",
        precio: 540,
        img: "./img/sonacorazoncitos.png"
    },
];

let carrito;


function carritoStorage() {
    let contStorage = JSON.parse(localStorage.getItem("carritoStorage"));
    console.log("contenido en LS del carrito",contStorage);

    if (contStorage) {
        let array =[];
        for (let i=0; i<contStorage.length; i++) {
            let skin= new Skin( contStorage[i], contStorage[i].cantidad);
            skin.actualizarPrecioTotal(),
            array.push(skin);
        }
        return array;
    }
    return [];
}

function imprimirSkinsEnHTML(skins) {
    let contendor = document.getElementById("contenedor");
    
    for (const skin of skins) {
        let card = document.createElement("div");
        
        card.innerHTML = `
            <div class="card">
                <div class="cardBody">
                    <div class="cardImg">
                        <img src="${skin.img}" alt="skin">
                    </div>
                    <div class="cardText">
                        <h2 class="cardTitle">${skin.campeon}</h2>
                        <h4 class="cardSubT">${skin.descripcion}</h4>
                        <p class="cardP">${skin.precio}RP</p>
                    </div>
                    <div class="cardContBtn">
                        <button id="agregar${skin.id}" class="btncard">Agregar</button>
                    </div>
                </div>
            </div>
        `;

        contendor.appendChild(card);

        let btn= document.getElementById(`agregar${skin.id}`);

        btn.onclick= ()=>agregarAlCarrito(skin.id);
    }
}

function tablaProduct(array) {
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML= "";

    let precioTotal= obtenerPrecioTotal(array);

    let tabla= document.createElement("div");

    tabla.innerHTML=`
        <table class="table">
            <th class="text" >Precio Final: ${precioTotal}RP</th>
            <tbody id="bodyT">
            
            </tbody>    
        </table>
    `;

    contenedor.appendChild(tabla);

    let bodyT = document.getElementById("bodyT");
    for(let skin of array) {
        let datos= document.createElement("tr");
        /*DAR CLASE Y ESTILOS EN CSS*/
        datos.innerHTML= `
            <tr>
                <th >Producto: ${skin.campeon}</th>
                <th >${skin.descripcion}</th>
                <th >Cantidad: ${skin.cantidad}</th>
                <th >Valor: ${skin.precio}RP</th>
                
                <th ><button id="eliminar${skin.id}" class="btn">Eliminar</button></th>
            </tr>
        `;
    bodyT.appendChild(datos);

    $(`#eliminar${skin.id}`).on("click",()=>{eliminarDelCarrito(skin.id);});
    }
}

function agregarAlCarrito(idProducto) {
    let skinEnCarrito = carrito.find((elemento)=>{
        if (elemento.id == idProducto){
            return true;
        }
    })

    if(skinEnCarrito) {
        let index =carrito.findIndex((elemento)=>{
            if(elemento.id ===skinEnCarrito.id) {
                return true;
            }
        });
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    }else {
        carrito.push(new Skin(skins[idProducto],1));
    }
    
    localStorage.setItem("carritoStorage",JSON.stringify(carrito));
    tablaProduct(carrito);
}

function eliminarDelCarrito(id) {
    let skin= carrito.find((skin)=> skin.id ===id);
    let index = carrito.findIndex((element)=>{
        if(element.id === skin.id) {
            return true;
        }
    });

    if (skin.cantidad > 1) {
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    }else {
        carrito.splice(index, 1);
        if (carrito.length === 0) {
            carrito= [];
        }
    }

    localStorage.setItem("carritoStorage", JSON.stringify(carrito));
    tablaProduct(carrito);
}

function obtenerPrecioTotal(array) {
    let precioTotal = 0;

    for (const product of array) {
        precioTotal += product.precioTotal
    }
    return precioTotal;
}

imprimirSkinsEnHTML(skins);
carrito= carritoStorage();
tablaProduct(carrito);