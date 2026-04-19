const contenedor = document.getElementById("productos");
const form = document.getElementById("formProducto");
const contador = document.getElementById("contador-carrito");

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// REEMPLAZA TU FETCH POR ESTE:
fetch("http://localhost:3000/productos")
  .then(res => res.json())
  .then(data => {
    // EL SIGNO "=" BORRA LO ANTERIOR Y PONE LO NUEVO
    // EL ".slice(0, 4)" DEJA SOLO LOS PRIMEROS 4
    productos = data.slice(0, 4); 
    renderProductos();
  })
  .catch((err) => {
    console.error("Error:", err);
    renderProductos();
  });
  
// 🔹 Render
function renderProductos() {
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Concatenamos la carpeta 'img/' con el nombre que viene de la DB
    const rutaImagen = `img/${p.imagen}`; 

    card.innerHTML = `
      <img src="${rutaImagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio">Q${p.precio}</p>
      <p class="${p.stock > 0 ? 'disponible' : 'agotado'}">
        ${p.stock > 0 ? 'En stock' : 'Agotado'}
      </p>
      <button onclick="agregarCarrito(${index})" ${p.stock === 0 ? "disabled" : ""}>
        Agregar al carrito
      </button>
    `;
    contenedor.appendChild(card);
  });
}

// 🔹 Agregar al carrito
function agregarCarrito(index) {
  const producto = productos[index];

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContador();
  alert("Producto agregado al carrito 🛒");
}

// 🔹 Contador
function actualizarContador() {
  contador.textContent = carrito.length;
}

// 🔹 Agregar producto manual
// --- Lógica de Usuario y Contador (Latz Studio) ---

// 1. Ejecutamos el contador que ya tenías
actualizarContador();

// 2. Manejamos el cambio de nombre de usuario al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const loginBtn = document.querySelector(".login-btn");

    if (usuarioGuardado && loginBtn) {
        // Cambiamos el texto y el estilo para resaltar al usuario activo
        loginBtn.innerHTML = `Hola, ${usuarioGuardado}`;
        loginBtn.style.backgroundColor = "#4CAF50"; 
        loginBtn.style.color = "white";
        loginBtn.href = "#";

        // Configuración del cierre de sesión
        loginBtn.onclick = (e) => {
            e.preventDefault();
            if (confirm(`¿${usuarioGuardado}, deseas cerrar sesión en Latz Studio?`)) {
                localStorage.removeItem("usuarioLogueado");
                window.location.reload();
            }
        };
    }
});