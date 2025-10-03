// addproduct.js
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

// Creamos el controlador de productos
const pastes = new ItemsController();

// Agregamos los 10 productos
pastes.addItem("Frijol", "(Frijol y chipotle)", 25, "/images/PASTES/IMG_3151_frijol_abierto.jpeg");
pastes.addItem("Carne con papa", "(Papa, carne de res, cebolla, perejil y chile)", 25, "/images/PASTES/IMG_3166_papa_abierto.jpeg");
pastes.addItem("Mole verde", "(Mole verde con pollo)", 25, "/images/PASTES/IMG_3230_moleverde_abierto.jpeg");
pastes.addItem("Cochinita pibil", "(Carne de cerdo adobada)", 29, "/images/PASTES/IMG_3251.jpeg");
pastes.addItem("Salchicha", "(Salchicha, queso amarillo, queso oaxaca, catsup y chipotle)", 25, "/images/PASTES/IMG_3260_salchicha_abierto.jpeg");
pastes.addItem("Mole rojo", "(Mole rojo con pollo)", 25, "/images/PASTES/IMG_3186_mole_abierto.jpeg");
pastes.addItem("Rajas con pollo", "(Rajas poblanas, elote, pollo y crema)", 27, "/images/PASTES/IMG_3217_rajas_abierto.jpeg");
pastes.addItem("Piña", "(Mermelada de piña natural)", 27, "/images/PASTES/IMG_3202_piña_abierto.jpeg");
pastes.addItem("Budín Pastiara", "(Budín de naranja)", 29, "/images/PASTES/Paste_budin.JPG");


// Insertamos los productos en el DOM
pastes.insertItem();