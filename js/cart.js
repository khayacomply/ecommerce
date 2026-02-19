/* === SHOPPING CART FUNCTIONALITY === */

let cart = [];

// Initialize cart from localStorage
function initCart() {
    const saved = localStorage.getItem('mdl_cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    saveCart();
    updateCartUI();
    showAlert(`${product.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update cart quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        updateCartUI();
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('mdl_cart', JSON.stringify(cart));
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cartCount');
    
    if (!container || !totalEl) return;
    
    // Update badge count
    if (countEl) {
        countEl.innerText = getCartCount();
    }
    
    // Update cart modal content
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
        totalEl.innerText = 'R 0.00';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
            <div class="d-flex align-items-center">
                <img src="${item.image}" width="60" class="rounded me-3 border" onerror="this.src='https://via.placeholder.com/60'">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-muted">R ${item.price.toLocaleString()} x ${item.quantity}</small>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i>
            </button>
        </div>`;
    }).join('');
    
    totalEl.innerText = `R ${total.toLocaleString()}`;
}

// Toggle cart modal
function toggleCart() {
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', initCart);