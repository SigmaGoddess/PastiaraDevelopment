const input = document.getElementById("input-titulo-producto");
const aviso = document.querySelector('.aviso-titulo-de-producto');
let timeoutId; // para guardar el timeout activo
console.log(input);

input.addEventListener("input", function() {
  const valor = this.value;
  

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

  // Opcional: limpiar caracteres inválidos en tiempo real
  this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
});