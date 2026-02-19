/* === MAIN APPLICATION LOGIC === */

// Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
    
    const navBar = document.getElementById('navbarNav');
    if (navBar && navBar.classList.contains('show')) {
        new bootstrap.Collapse(navBar).hide();
    }
}

// Render product card
function createProductCard(product) {
    return `
    <div class="col-md-4 col-sm-6" data-category="${product.category}">
        <div class="product-card">
            <div class="product-img-wrapper" onclick="showProductDetails(${product.id})">
                <span class="badge ${product.stock ? 'bg-success' : 'bg-secondary'} badge-stock">
                    ${product.stock ? '✓ In Stock' : 'Out of Stock'}
                </span>
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="card-body">
                <small class="text-muted text-uppercase" style="font-size:0.7rem">${product.category}</small>
                <h5 class="card-title text-truncate mt-1" onclick="showProductDetails(${product.id})" style="cursor:pointer">${product.name}</h5>
                <p class="text-muted small mb-2">${product.description}</p>
                <div class="card-price">R ${product.price.toLocaleString()}</div>
                <div class="vat-text">incl. VAT (${API_CONFIG.BUSINESS.VAT_NUMBER})</div>
                <div class="color-options">
                    ${product.colors.slice(0,4).map(c => `<div class="color-dot" style="background:${getColorCode(c)}" title="${c}"></div>`).join('')}
                    ${product.colors.length>4 ? `<small class="text-muted">+${product.colors.length-4}</small>`:''}
                </div>
                <button class="btn btn-sm btn-outline-primary w-100 mt-3" onclick="addToCart(${product.id})">
                    <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    </div>`;
}

// Get color code
function getColorCode(color) {
    const map = {
        'Black':'#000','White':'#fff','Red':'#dc3545','Blue':'#0d6efd',
        'Green':'#198754','Pink':'#ff69b4','Purple':'#6f42c1','Gray':'#6c757d',
        'Silver':'#c0c0c0','Orange':'#fd7e14','Camo':'#4b5320','Chrome':'#a8a9ad','Yellow':'#ffc107'
    };
    return map[color] || '#ccc';
}

// Render featured products
function renderFeatured() {
    const container = document.getElementById('featured-products-container');
    if (container) {
        container.innerHTML = products.slice(0, 6).map(p => createProductCard(p)).join('');
    }
}

// Render shop products
function renderShop(filter = 'all') {
    const container = document.getElementById('shop-products-container');
    const count = document.getElementById('product-count');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    if (count) count.textContent = filtered.length;
    if (container) container.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

// Render category filters
function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    
    container.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.id === 'all' ? 'active' : ''}" onclick="filterProducts('${cat.id}')">
            <i class="bi bi-${cat.icon} me-2"></i>${cat.name}
        </button>
    `).join('');
}

// Show product details
function showProductDetails(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    document.getElementById('detail-img').src = p.image;
    document.getElementById('detail-title').innerText = p.name;
    document.getElementById('detail-price').innerText = `R ${p.price.toLocaleString()}`;
    document.getElementById('detail-desc').innerText = p.description;
    document.getElementById('detail-sku').innerText = p.sku;
    document.getElementById('detail-specs').innerHTML = p.description.split('. ')
        .filter(s => s.trim())
        .slice(0, 5)
        .map(s => `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${s}</li>`).join('');
    
    const addBtn = document.getElementById('detail-add-btn');
    if (addBtn) {
        addBtn.onclick = () => addToCart(p.id);
    }
    
    navigateTo('product-details');
}

// Filter products
function filterProducts(category) {
    renderShop(category);
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    event.target.closest('.category-btn').classList.add('active');
}

// Search products
function searchProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const q = input.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q)
    );
    
    renderShop('all');
    const container = document.getElementById('shop-products-container');
    const count = document.getElementById('product-count');
    if (container) container.innerHTML = filtered.map(p => createProductCard(p)).join('');
    if (count) count.textContent = filtered.length;
}

// Initiate checkout (PayFast Integration Point)
function initiateCheckout() {
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'error');
        return;
    }
    
    // TODO: Integrate with PayFast API
    // Example PayFast form submission:
    /*
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = API_CONFIG.PAYFAST.SANDBOX 
        ? 'https://sandbox.payfast.co.za/eng/process' 
        : 'https://www.payfast.co.za/eng/process';
    
    form.innerHTML = `
        <input type="hidden" name="merchant_id" value="${API_CONFIG.PAYFAST.MERCHANT_ID}">
        <input type="hidden" name="merchant_key" value="${API_CONFIG.PAYFAST.MERCHANT_KEY}">
        <input type="hidden" name="return_url" value="${API_CONFIG.PAYFAST.RETURN_URL}">
        <input type="hidden" name="cancel_url" value="${API_CONFIG.PAYFAST.CANCEL_URL}">
        <input type="hidden" name="notify_url" value="${API_CONFIG.PAYFAST.NOTIFY_URL}">
        <input type="hidden" name="amount" value="${getCartTotal()}">
        <input type="hidden" name="item_name" value="MDL SOLUTIONS Order">
    `;
    
    document.body.appendChild(form);
    form.submit();
    */
    
    alert('Redirecting to Secure Payment Gateway (PayFast/Yoco)...');
}

// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // TODO: Send to backend API
            showAlert('Message sent successfully! We will contact you soon.', 'success');
            this.reset();
        });
    }
    
    // Initialize page
    renderFeatured();
    renderShop();
    renderCategoryFilters();
    updateNavbarForGuest();
    
    // Set current date in policies
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString();
    
    // Show cookie banner
    setTimeout(() => {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'block';
    }, 1000);
});