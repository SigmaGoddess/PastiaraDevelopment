class Products{
    constructor(idProduct = 0){
        this.idProduct = idProduct;
        this.listproduct = [];
    }

    


}

function mostrarMensaje(){
    console.log("Click");
}

//DOM
const clickBtnAgregar = document.querySelector('.btn-agregar')

clickBtnAgregar.addEventListener('click', mostrarMensaje);
