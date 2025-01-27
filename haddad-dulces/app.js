// Array para almacenar productos en el carrito
let carrito = [];

/**
 * Abre/Cierra la vista del carrito (lateral)
 */
function toggleCarrito() {
  const carritoEl = document.getElementById('carrito');
  carritoEl.classList.toggle('open');
}

/**
 * Agrega un producto al carrito
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio unitario del producto
 * @param {string} inputId - ID del input donde se ingresa la cantidad
 * @param {string} tipoUnidad - docena, bandeja, etc.
 */
function agregarAlCarrito(nombre, precio, inputId, tipoUnidad) {
  const cantidad = parseInt(document.getElementById(inputId).value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  // Buscar si el producto ya existe en el carrito
  const productoExistente = carrito.find(item => item.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad, tipoUnidad });
  }
  actualizarCarrito();
}

/**
 * Refresca la vista del carrito con los productos actuales
 */
function actualizarCarrito() {
  const carritoItemsEl = document.getElementById('carrito-items');
  const carritoCount = document.getElementById('carrito-count');
  const carritoTotalAmount = document.getElementById('carrito-total-amount');

  carritoItemsEl.innerHTML = '';
  let total = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const itemEl = document.createElement('div');
    itemEl.classList.add('carrito-item');
    itemEl.innerHTML = `
      <span>${item.nombre} x ${item.cantidad} (${item.tipoUnidad})</span>
      <span>${subtotal} Bs</span>
    `;
    carritoItemsEl.appendChild(itemEl);
  });

  // Actualiza el contador en el ícono del carrito
  const contadorTotal = carrito.reduce((acc, curr) => acc + curr.cantidad, 0);
  carritoCount.textContent = contadorTotal;

  // Actualiza el monto total en el carrito
  carritoTotalAmount.textContent = total + ' Bs';
}
/**
     * Vacía el carrito (manual)
     */
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}
/**
 * Muestra la sección de pago/resumen
 */
function irAPagar() {
  // Cerrar el carrito (por si está abierto)
  toggleCarrito();
  // Rellena el resumen y muestra el modal de pago
  mostrarResumenPedido();
  document.getElementById('pago-section').classList.remove('hidden');
}

/**
 * Crea el resumen del pedido con los productos del carrito
 */
function mostrarResumenPedido() {
  const resumenEl = document.getElementById('resumen-pedido');
  const pagoTotalEl = document.getElementById('pago-total');
  const pagoTotalQREl = document.getElementById('pago-total-qr');
  const confirmarWhatsApp = document.getElementById('confirmar-whatsapp');

  resumenEl.innerHTML = '';
  let total = 0;

    // AQUI definimos la variable:
    let detalleProductos = ''; 

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    // Agregamos una línea tipo "Baklava de nuez x 2 docenas = 160 Bs"
    detalleProductos += `${item.nombre} x ${item.cantidad} (${item.tipoUnidad}) = ${subtotal} Bs\n`;
    const p = document.createElement('p');
    p.textContent = `${item.nombre} x ${item.cantidad} = ${subtotal} Bs`;
    resumenEl.appendChild(p);
  });

  // Total final
  pagoTotalEl.textContent = total;
  pagoTotalQREl.textContent = total;

    // Construimos el mensaje completo
    let mensaje = `¡Hola! Deseo confirmar mi pedido en Haddad:\n\n${detalleProductos}\nTotal a pagar: ${total} Bs\n`;

    // Convertir a formato URL
    mensaje = encodeURIComponent(mensaje);
  
    const urlWhatsApp = `https://wa.me/59170822155?text=${mensaje}`;
    document.getElementById('pago-total').textContent = total;
    document.getElementById('pago-total-qr').textContent = total;
    document.getElementById('confirmar-whatsapp').href = urlWhatsApp;
  }
      /**
     * Al confirmar el pedido:
     * 1) Abrir la URL de WhatsApp
     * 2) Vaciar el carrito
     * 3) Cerrar la sección de pago
     */
    function confirmarPedido() {
      // Abre WhatsApp en otra pestaña
      window.open(urlWhatsAppGlobal, '_blank');
      // Vacía el carrito
      vaciarCarrito();
      // Cierra la ventana de resumen
      cerrarPago();
    }
/**
 * Cierra la sección de pago
 */
function cerrarPago() {
  document.getElementById('pago-section').classList.add('hidden');
}
