class ItemsController {
    //Por medio del constructor inicializamos el objeto con con array vacio 
    constructor() {
        this.items = [];
    }

    // Método para crear item con formato JSON y agregarlo al array 
    addItem(title, description, price, image) {
        const item = {
            title: title,
            description: description,
            price: price,
            image: image
        };

        // Agregamos el item creado al array
        this.items.push(item);
    }
    //Metodo para insertar los items que se encuentran dentro del array
    insertItem() {

        for (const itemOfList of this.items) {
            const cardHtml = `
                <div class="col-lg-4 col-md-6 mb-5">
                    <div class="product-card">
                        <div class="image-container">
                            <img src="${itemOfList.image}" alt="Paste frijol con chipotle" class="product-image">
                            <div class="heart-favorite" data-product="ensalada-rusa"
                                onclick="toggleFavorite('ensalada-rusa')"><i class="fas fa-heart"></i></div>
                        </div>

                        <div class="product-info">
                            <h3>${itemOfList.title}</h3>
                            <p class="price">$${itemOfList.price}</p>
                            <p class="description">${itemOfList.description}</p>
                        </div>
                    </div>
                </div>
    `;
            //Buscamos el contenedor de lista de productos
            const containerListProducts = document.getElementById("container-products");
            containerListProducts.innerHTML += cardHtml;


        }
    }
}

//Creamos el objeto donde se almacenan los productos que vamos a agregar
const pastes = new ItemsController();

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
//llamamos la método para insertar los items que se encuentren en el array
pastes.insertItem();
