/**
 * Gestiona la conexión a la base de datos y actualizar
 * la base de datos
 */
class AdministradorDB{

    //Asignamos nombre a la base de datos
    static nombreDB = "productos-pastiara";
    //Se encarga de almacenar el estado de la conexión con la base de datos
    static db = null;  

    static async verificarAlmacen(nombreDeAlmacen){

        //Primero verificamos si hayuna conexión con la base de datos activa con this.db
        //Si la base de datos si está activa verificamos que el almacen exista
        //De esta forma si estamos conectados a la DB y el almacen existe no realizamos nada
        if(this.db && this.db.objectStoreNames.contains(nombreDeAlmacen)){
            return;
        }

        /*Si es la primera vez que iniciamos la DB o el almacen no existe es necesario asignar
        una versión hacemos uso del operador ternario para asignar la versión de la DB, si la
        DB es un false quiere decir que no se ha iniciado la DB y que es la primera vez que se
        haria y es por eso que se le asigna la versión 1
        */
        const actualizarVersion = this.db ? this.db.version + 1 : 1;


        /*Revisamos la conexión de la base de datos en caso de ser true(conexión activa) cerramos
        la conexión ya que es necesario para poder realizar los cambios en la estructura de la DB
        */
        if(this.db){
            this.db.close();
        }

        return new Promise((resolve, reject)=>{
            //iniciamos la DB
            const request = indexedDB.open(this.nombreDB,actualizarVersion);
            
            //verificamos el evento error de la base de datos
            request.addEventListener("error", (Event)=>{
                //mostramos mensaje de error
                console.error(`Error en base de datos ${Event.target.error}`);
                //Devolvemos el error a la promesa por el método reject
                reject(Event.target.error);
            });

            request.addEventListener('upgradeneeded', (Event) =>{
                console.log(`Actualizando DB  a la versión ${actualizarVersion}`);
                //obtenemos el objeto de la DB
                const db = Event.target.result;
                //revisamos si el almacen ya existe dentro de la DB
                if(!db.objectStoreNames.contains(nombreDeAlmacen)){

                    console.log(`Se está creando el almacen ${nombreDeAlmacen}`);
                    /*creamos el almacen con el nombre asignado, usamos la propiedad titulo como la llave primaria
                    que nos permitira apuntar al objeto de una manera mas facil.
                    */
                    db.createObjectStore(nombreDeAlmacen,{keyPath: 'titulo', autoIncrement: true});

                }
            });
        
            request.addEventListener('success', (Event)=>{
                this.db = Event.target.result;
                console.log(`La conexión con la base de datos ${this.nombreDB} versión ${this.db.version} exitosa`);
                resolve();
            });
        
        });

    }

}

class AdministrarAlmacen{

    constructor(nombreAlmacen){

        if(!nombreAlmacen){
           throw new Error('Debes de ingresar un nombre para el contenedor a crear');
        }
        this.nombreAlmacen = nombreAlmacen;
    }


    async init(){
        await AdministradorDB.verificarAlmacen(this.nombreAlmacen);
        console.log('Base de datos iniciada');
        return this;

    }

    /**
     * Método privado con el que obtenemos la transacción y el almacen destino
     * @param {'readonly' | 'readwrite'} tipoTransacción -  
     */
    #iniciarTransaccion(tipoTransaccion){

        if(!AdministradorDB.db){
            throw  new Error('La base de datos no esta iniciada, use el método .init() para inicializarla');
        }

        const transaccion =  AdministradorDB.db.transaction(this.nombreAlmacen, tipoTransaccion);
        return {
            transaccion: transaccion,
            tipoTransaccion : transaccion.objectStore(this.nombreAlmacen)
        };

    }
    
    async agregarProducto(datosProducto){

        return new Promise((resolve, reject)=>{

            const {tipoTransaccion} = this.#iniciarTransaccion("readwrite");
            const request = tipoTransaccion.put(datosProducto);
            request.addEventListener('success', ()=> resolve(request.result));
            request,addEventListener('error',() => reject(request.target.error));
        });
    }

    /**
     * Método encargado de dar formato de objeto a las entradas de formulario
     * @param {Titulo de producto} titulo 
     * @param {breve descripción de producto} descripcion 
     * @param {precio de producto} precio 
     * @param {imagen referente a producto} imagen 
     */
    formato(titulo, descripcion, precio, imagen){
        const producto = {
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen
        };

        return producto;
    }
}


class ItemsController {
    constructor() {
        this.items = [];
    }

    // Agrega un producto al array
    addItem(title, description, price, image) {
        const item = { title, description, price, image };
        this.items.push(item);
    }

    // Inserta los productos en el DOM
    insertItem() {
        const containerListProducts = document.getElementById("container-products");
        containerListProducts.innerHTML = ''; // Limpiamos el contenedor

        for (const itemOfList of this.items) {
            // Creamos un ID dinámico a partir del título
            const productId = itemOfList.title.toLowerCase().replace(/\s+/g, '-');

            // Creamos el contenedor de la card
            const card = document.createElement('div');
            card.classList.add('col-lg-4', 'col-md-6', 'mb-5');

            card.innerHTML = `
                <div class="product-card">
                    <div class="image-container">
                        <img src="${itemOfList.image}" alt="${itemOfList.title}" class="product-image">
                        <div class="heart-favorite" data-product="${productId}">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${itemOfList.title}</h3>
                        <p class="price">$${itemOfList.price}</p>
                        <p class="description">${itemOfList.description}</p>
                    </div>
                </div>
            `;

            containerListProducts.appendChild(card);

            // Asignamos evento al corazón
            const heart = card.querySelector('.heart-favorite');
            heart.addEventListener('click', () => toggleFavorite(productId));
        }
    }
}

//Creamos el objeto donde se almacenan los productos que vamos a agregar
//const pastes = new ItemsController();
/*
//Agregamos los 10 productos
pastes.addItem("Frijol", "(Frijol y chipotle)", 25, "/images/PASTES/IMG_3151_frijol_abierto.jpeg");
pastes.addItem("Carne con papa", "(Papa, carne de res, cebolla, perejil y chile)", 25, '/images/PASTES/IMG_3166_papa_abierto.jpeg');
pastes.addItem("Mole verde", "(Mole verde con pollo)", 25, '/images/PASTES/IMG_3230_moleverde_abierto.jpeg');
pastes.addItem('Cochinita pibil', '(Carne de cerdo adobada)', 29, '/images/PASTES/IMG_3251.jpeg');
pastes.addItem('Salchicha', '(Salchicha, queso amarillo, queso oaxaca, catsup y chipotle)', 25, '/images/PASTES/IMG_3217_rajas_abierto.jpeg');
pastes.addItem('Mole rojo', '(Mole rojo con pollo)', 25, '/images/PASTES/IMG_3186_mole_abierto.jpeg');
pastes.addItem('Rajas con pollo', '(Rajas poblanas, elote, pollo y crema)', 27, '/images/PASTES/IMG_3217_rajas_abierto.jpeg');
pastes.addItem('Piña','(Mermelada de piña natural)', 27, '/images/PASTES/IMG_3202_piña_abierto.jpeg');
pastes.addItem('Budín pastiara', '(Budín de naranja)', 29, '/images/PASTES/IMG_3202_piña_abierto.jpeg');
pastes.addItem('Budín pastiara2', '(Budín de naranja2)', 29, '/images/PASTES/IMG_3202_piña_abierto.jpeg');
//llamamos el método para insertar los items que se encuentren en el array
// pastes.insertItem();*/


async function addproducts(){
    
    const tipoProducto= document.querySelector('#select-tipo-producto').value;
    const tituloProducto = document.querySelector('.input-titulo-producto').value;
    const descripcionProducto = document.querySelector('.input-descripcion-producto').value;
    const precioProducto = document.querySelector('.input-precio-producto').value;
    const imagen = document.querySelector('#input-imagen-producto');
    const valorImagen = imagen.value;
    const datosImagen = imagen.files[0];
    console.log(tipoProducto);
    
    
    
    
    if(tipoProducto == "" || tituloProducto == "" || descripcionProducto == "" || precioProducto == "" || valorImagen == ""){

        alert("Rellene todos los campos con la información solicitada");
    }
    else{

        if(tipoProducto === "pastes"){
        const productoPaste = new AdministrarAlmacen("Pastes");
        await productoPaste.init();
        const product = productoPaste.formato(tituloProducto,descripcionProducto,precioProducto,datosImagen);
        console.log("Se agregó un producto al almacen Pastes");
        productoPaste.agregarProducto(product);

        document.querySelector('#select-tipo-producto').value = "";
        document.querySelector('.input-titulo-producto').value = "";
        document.querySelector('.input-descripcion-producto').value = "";
        document.querySelector('.input-precio-producto').value = "";
        document.querySelector('#input-imagen-producto').value = "";

        }

        else if(tipoProducto == "panaderia"){
            const productoPanaderia = new AdministrarAlmacen("Panaderia");
            await productoPanaderia.init();

            const product = productoPanaderia.formato(tituloProducto,descripcionProducto,precioProducto,datosImagen);
            console.log("Se agregó un producto al almacen Panaderia");
            console.log(product);
            productoPanaderia.agregarProducto(product);

            document.querySelector('#select-tipo-producto').value = "";
            document.querySelector('.input-titulo-producto').value = "";
            document.querySelector('.input-descripcion-producto').value = "";
            document.querySelector('.input-precio-producto').value = "";
            document.querySelector('#input-imagen-producto').value = "";
        }

        else if(tipoProducto == "volovanes"){

            const productoVolovanes = new AdministrarAlmacen("Volovanes");
            await productoVolovanes.init();

            const product = productoVolovanes.formato(tituloProducto,descripcionProducto,precioProducto,datosImagen);
            console.log("Se agregó un producto al almacen Volovanes");
            console.log(product);
            productoVolovanes.agregarProducto(product);

            document.querySelector('#select-tipo-producto').value = "";
            document.querySelector('.input-titulo-producto').value = "";
            document.querySelector('.input-descripcion-producto').value = "";
            document.querySelector('.input-precio-producto').value = "";
            document.querySelector('#input-imagen-producto').value = "";

        }
    }
}






//DOM
const clickBtnAgregar = document.querySelector('.btn-agregar');
clickBtnAgregar.addEventListener('click', addproducts);



