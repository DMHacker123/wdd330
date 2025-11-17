const CART_KEY = "so-cart";

/* Devuelve array de items: [{ id, name, price, quantity }] */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error leyendo carrito:", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* Actualiza el badge con el total de items */
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const el = document.querySelector("#cart-count");
  if (!el) return;
  el.textContent = total;
  if (total === 0) {
    el.setAttribute("data-empty", "true");
    el.setAttribute("aria-label", "Carrito vacío");
  } else {
    el.removeAttribute("data-empty");
    el.setAttribute("aria-label", `${total} artículo(s) en el carrito`);
  }
}

/* Añade producto */
function addToCart({ id, name, price, quantity = 1 }) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 0) + quantity;
  } else {
    cart.push({ id, name, price: Number(price), quantity });
  }
  saveCart(cart);
  updateCartCount();
}

/* Remueve producto o reduce cantidad */
function removeFromCart(id, qty = 0) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return;
  if (qty <= 0 || cart[idx].quantity <= qty) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity -= qty;
  }
  saveCart(cart);
  updateCartCount();
}

/* Inicialización */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const el = e.currentTarget;
      addToCart({
        id: el.dataset.id,
        name: el.dataset.name,
        price: el.dataset.price,
        quantity: 1
      });
      btn.textContent = "Añadido ✓";
      setTimeout(() => btn.textContent = "Añadir al carrito", 1200);
    });
  });
});
