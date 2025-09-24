function addProduct(product){
    const cardHtml = `
                <div class="card" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    </div>
                </div>
    `;
    //Buscamos el contenedor de lista de productos
    const containerListProducts = document.getElementById("list-products");
    containerListProducts.innerHTML += cardHtml;
}

const product01 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product02 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product03 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product04 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product05 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product06 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product07 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product08 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product09 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};
const product10 = {'title':'Paste de frijol',
                   'description': 'Paste relleno de frijol',
                   'image': '../../images/PASTES/IMG_3142_ frjol.jpeg'
};


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

