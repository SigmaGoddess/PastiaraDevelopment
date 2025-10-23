// addproduct.js
class ItemsController {
    constructor() {
        this.items = [];
    }

    
/**
 * // Agrega un producto al array
    addItem(title, description, price, image) {
        const item = { title, description, price, image };
        this.items.push(item);
    }
 */
// ===NUEVO===: Carga los productos por categoría usando fetch e inyecta en el contenedor.
    async loadItemsAndInject(category, containerId) {
        //Construye la URL para el endpoint específico de categoría
        const API_URL = `${API_BASE_URL}/${category}`; 
        
        try {
            //Realiza la solicitud HTTP
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                //Maneja errores de respuesta HTTP (ej. 404 si la categoría no existe)
                throw new Error(`Error al cargar productos de ${category}: ${response.status}`);
            }

            //Convierte la respuesta a un array de JavaScript (DTOs)
            this.items = await response.json(); 
            
            //Llama a la inyección para pintar los productos en el contenedor
            this.insertItem(containerId); 

        } catch (error) {
            console.error(`Fallo al obtener productos de ${category}:`, error);
            // Si falla, puedes inyectar un mensaje de error o vacío en el contenedor
            document.getElementById(containerId).innerHTML = '<p class="text-danger">Error al cargar productos.</p>';
        }
    }

//====NUEVO====== insertItem ahora recibe el ID del contenedor
insertItem(containerId) {
        const containerListProducts = document.getElementById(containerId);
        if (!containerListProducts) return; // Sale si el contenedor no existe
        
        containerListProducts.innerHTML = ''; // Limpiamos el contenedor

        for (const itemOfList of this.items) {
            // NOTA IMPORTANTE: Los nombres de las propiedades deben coincidir con los campos de tu ProductDto (productName, productPrice, etc.)
            
            // Usamos productName para generar un ID único
            const productId = itemOfList.productName.toLowerCase().replace(/\s+/g, '-');

            // Creamos el contenedor de la card
            const card = document.createElement('div');
            card.classList.add('col-lg-4', 'col-md-6', 'mb-5');

            card.innerHTML = `
                <div class="product-card">
                    <div class="image-container">
                        <img src="${itemOfList.imageUrl || '/images/default.jpg'}" alt="${itemOfList.productName}" class="product-image">
                        <div class="heart-favorite" data-product="${productId}">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${itemOfList.productName}</h3>
                        <p class="price">$${itemOfList.productPrice}</p>
                        <p class="description">${itemOfList.productDescription}</p>
                    </div>
                </div>
            `;

            containerListProducts.appendChild(card);
            // Asignamos evento
            //===este es un elemento de CSS que va a encontrar el elemento en el HTML
            const heart = card.querySelector('.heart-favorite');
            heart.addEventListener('click', () => toggleFavorite(productId));
        }
    }
    }
    // Inserta los productos en el DOM
    /**
     * insertItem() {
        const containerListProducts = document.getElementById("container-products");
        containerListProducts.innerHTML = ''; // Para limpiar el contenedor

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
    }*/

/** 
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

*/
// ==============Controlador INDEPENDIENTE para cada categoría.===============

// Controlador para la categoría de Pastes
const pastesController = new ItemsController();
pastesController.loadItemsAndInject('pastes', 'container-pastes'); 

// Controlador para la categoría de Panadería
const panaderiaController = new ItemsController();
panaderiaController.loadItemsAndInject('panaderia', 'container-panaderia'); 

// Controlador para la categoría de Volovanes
const volovanesController = new ItemsController();
volovanesController.loadItemsAndInject('volovanes', 'container-volovanes');


