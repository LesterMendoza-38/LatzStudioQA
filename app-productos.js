let productosTotales = []; // Array para guardar todo el catálogo
const grid = document.getElementById('grid-productos');

// Antes
fetch("http://localhost:3000/productos")

// Ahora (con tu IP real)
fetch("http://192.168.1.15:3000/productos")
  .then(res => res.json())
  .then(data => {
    // Aquí NO usamos .slice(), queremos el 100% de los datos
    productosTotales = data; 
    mostrarProductos(productosTotales);
  })
  .catch(err => console.error("Error en Catálogo:", err));

function mostrarProductos(lista) {
  grid.innerHTML = lista.map(p => `
    <div class="card">
      <img src="img/${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio">Q${p.precio}</p>
      <button>Agregar al Carrito</button>
    </div>
  `).join('');
}