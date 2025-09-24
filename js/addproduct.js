function addProduct(product){
    const cardHtml = `
                <div class="col-lg-4 col-md-6 mb-5">
                    <div class="product-card">
                        <div class="image-container">
                            <img src="${product.image}" alt="Paste frijol con chipotle" class="product-image">
                            <div class="heart-favorite" data-product="ensalada-rusa"
                                onclick="toggleFavorite('ensalada-rusa')"><i class="fas fa-heart"></i></div>
                        </div>

                        <div class="product-info">
                            <h3>${product.title}</h3>
                            <p class="price">$${product.price}</p>
                            <p class="description">${product.description}</p>
                        </div>
                    </div>
                </div>
    `;
    //Buscamos el contenedor de lista de productos
    const containerListProducts = document.getElementById("container-products");
    containerListProducts.innerHTML += cardHtml;
}

//Creamos los 10 objetos 
const product01 = {'title':'Frijol',
                   'description': '(Frijol y chipotle)',
                   'price':25,
                   'image': '/images/PASTES/IMG_3151_frijol_abierto.jpeg'
};

const product02 = {'title':'Carne con papa',
                   'description': '(Papa, carne de res, cebolla, perejil y chile)',
                   'price':25,
                   'image': '/images/PASTES/IMG_3166_papa_abierto.jpeg'
};

const product03 = {'title':'Mole verde',
                   'description': '(Mole verde con pollo)',
                   'price':25,
                   'image': '/images/PASTES/IMG_3230_moleverde_abierto.jpeg'
};

const product04 = {'title':'Cochinita pibil',
                   'description': '(Carne de cerdo adobada)',
                   'price':29,
                   'image': '/images/PASTES/IMG_3251.jpeg'
};

const product05 = {'title':'Salchicha',
                   'description': '(Salchicha, queso amarillo, queso oaxaca, catsup y chipotle)',
                   'price':25,
                   'image': '/images/PASTES/IMG_3217_rajas_abierto.jpeg'
};

const product06 = {'title':'Mole rojo',
                   'description': '(Mole rojo con pollo)',
                   'price':25,
                   'image': '/images/PASTES/IMG_3186_mole_abierto.jpeg'
};

const product07 = {'title':'Rajas con pollo',
                   'description': '(Rajas poblanas, elote, pollo y crema)',
                   'price':27,
                   'image': '/images/PASTES/IMG_3217_rajas_abierto.jpeg'
};

const product08 = {'title':'Piña',
                   'description': '(Mermelada de piña natural)',
                   'price':27,
                   'image': '/images/PASTES/IMG_3202_piña_abierto.jpeg'
};

const product09 = {'title':'Budín pastiara',
                   'description': '(Budín de naranja)',
                   'price':29,
                   'image': '/images/PASTES/IMG_3202_piña_abierto.jpeg'
};

const product10 = {'title':'Budín pastiara2',
                   'description': '(Budín de naranja 2)',
                   'price':29,
                   'image': '/images/PASTES/IMG_3202_piña_abierto.jpeg'
};

//Agregamos los 10 objetos al localStorage con el fin de que cuando se inicie la pagina pastes
//estos se agreguen.
/*
localStorage.setItem("product01", JSON.stringify(product01));
localStorage.setItem("product02", JSON.stringify(product02));
localStorage.setItem("product03", JSON.stringify(product03));
localStorage.setItem("product04", JSON.stringify(product04));
localStorage.setItem("product05", JSON.stringify(product05));
localStorage.setItem("product06", JSON.stringify(product06));
localStorage.setItem("product07", JSON.stringify(product07));
localStorage.setItem("product08", JSON.stringify(product08));
localStorage.setItem("product09", JSON.stringify(product09));
localStorage.setItem("product10", JSON.stringify(product10));
*/
//Seagregan los productos a el archivo pastes.html en su sección correspondiente
addProduct(product01);
addProduct(product02);
addProduct(product03);
addProduct(product04);
addProduct(product05);
addProduct(product06);
addProduct(product07);
addProduct(product08);
addProduct(product09);
addProduct(product10);
