const inputs = document.querySelectorAll("#input-agregar-producto");
//const aviso = document.querySelector('.aviso-agregar-producto');
let timeoutId; // para guardar el timeout activo
console.log(inputs);

inputs.forEach(input => {

input.addEventListener("input", function() {
  const valor = this.value;
   const aviso = input.parentNode.querySelector("p:first-child");
  

  // Limpiar timeout previo
  if (timeoutId) clearTimeout(timeoutId);

  // Regex: solo letras (mayúsculas, minúsculas, tildes y espacios)
  if (/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/.test(valor)) {
    aviso.textContent = "⚠️ Solo se permiten letras.";
  } else {
    aviso.textContent = "";
  }

  // Si hay aviso, desaparece después de 3 segundos
  if (aviso.textContent !== "") {
    timeoutId = setTimeout(() => {
      aviso.textContent = "";
    }, 3000);
  }

  // limpiar caracteres inválidos en tiempo real
  this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
});
});


const inputPrecio = document.querySelector("#input-precio-producto");
const aviso = document.querySelector('#aviso-agregar-producto-precio');
console.log(inputPrecio);
console.log(aviso);

inputPrecio.addEventListener("input", function() {
  const valor = this.value;
   
  

  // Limpiar timeout previo
  if (timeoutId) clearTimeout(timeoutId);

  // Regex:solo numeros
  if (!(/^(\d+(\.\d*)?|\.\d+)$/.test(valor))) {
    aviso.textContent = "⚠️ Solo se permiten números.";
  } else {
    aviso.textContent = "";
  }

  // Si hay aviso, desaparece después de 3 segundos
  if (aviso.textContent !== "") {
    timeoutId = setTimeout(() => {
      aviso.textContent = "";
    }, 3000);
  }

  // limpiar caracteres inválidos en tiempo real
  //this.value = this.value.replace(/^\d+(\.\d+)?$/, '');
});