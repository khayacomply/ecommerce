/* === AUTHENTICATION SYSTEM ===
   Demo authentication - Replace with backend API in production
   File: js/auth.js
*/

let currentUser = null;
let currentRole = null;

// === LOGIN FUNCTIONS ===

// Open login modal
function openLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close login modal
function closeLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    const loginForm = document.getElementById('customer-login-form');
    const adminForm = document.getElementById('admin-login-form');
    const registerForm = document.getElementById('customer-register-form');
    if (loginForm) loginForm.reset();
    if (adminForm) adminForm.reset();
    if (registerForm) registerForm.reset();
    switchLoginTab('customer');
}

// Switch between Customer/Admin login tabs
function switchLoginTab(type) {
    const tabCustomer = document.getElementById('tab-customer');
    const tabAdmin = document.getElementById('tab-admin');
    const loginForm = document.getElementById('customer-login-form');
    const adminForm = document.getElementById('admin-login-form');
    const registerForm = document.getElementById('customer-register-form');
    
    if (tabCustomer) tabCustomer.classList.toggle('active', type === 'customer');
    if (tabAdmin) tabAdmin.classList.toggle('active', type === 'admin');
    if (loginForm) loginForm.style.display = type === 'customer' ? 'block' : 'none';
    if (adminForm) adminForm.style.display = type === 'admin' ? 'block' : 'none';
    if (registerForm) registerForm.style.display = 'none';
}

// === REGISTRATION FUNCTIONS ===

// Switch to registration form
function switchToRegistration() {
    const loginForm = document.getElementById('customer-login-form');
    const registerForm = document.getElementById('customer-register-form');
    const tabCustomer = document.getElementById('tab-customer');
    
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';
    if (tabCustomer) tabCustomer.classList.remove('active');
}

// Switch back to login form
function switchToLogin() {
    const loginForm = document.getElementById('customer-login-form');
    const registerForm = document.getElementById('customer-register-form');
    const tabCustomer = document.getElementById('tab-customer');
    
    if (registerForm) registerForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    if (tabCustomer) tabCustomer.classList.add('active');
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength; // 0-4
}

// === FORM HANDLERS ===

document.addEventListener('DOMContentLoaded', () => {
    
    // Customer Login Form
    const customerForm = document.getElementById('customer-login-form');
    if (customerForm) {
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('cust-email').value;
            const password = document.getElementById('cust-password').value;
            
            if (email && password.length >= 6) {
                currentUser = {email, name: email.split('@')[0], id: 'CUST-' + Math.floor(Math.random()*1000)};
                currentRole = 'customer';
                closeLogin();
                showCustomerDashboard();
                showAlert('Welcome back, ' + currentUser.name + '!', 'success');
            } else {
                showAlert('Invalid credentials. Please try again.', 'error');
            }
        });
    }
    
    // Admin Login Form
    const adminForm = document.getElementById('admin-login-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            
            if (email.includes('admin') && password.length >= 8) {
                currentUser = {email, name: 'Admin User', id: 'ADM-001', role: 'superadmin'};
                currentRole = 'admin';
                closeLogin();
                showAdminDashboard();
                showAlert('Admin access granted. Welcome, ' + currentUser.name + '.', 'success');
            } else {
                showAlert('Invalid admin credentials. Access denied.', 'error');
            }
        });
    }
    
    // Customer Registration Form
    const registerForm = document.getElementById('customer-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            const terms = document.getElementById('reg-terms').checked;
            
            // Validation
            if (password !== confirmPassword) {
                showAlert('Passwords do not match!', 'error');
                return;
            }
            if (password.length < 6) {
                showAlert('Password must be at least 6 characters.', 'error');
                return;
            }
            if (!terms) {
                showAlert('You must agree to the Terms & Conditions.', 'error');
                return;
            }
            
            // DEMO: Create account (Replace with API call in production)
            const newUser = {
                name: name,
                email: email,
                phone: phone,
                id: 'CUST-' + Math.floor(Math.random() * 10000),
                registered: new Date().toISOString()
            };
            
            // Save to localStorage (demo only)
            let users = JSON.parse(localStorage.getItem('mdl_users') || '[]');
            users.push(newUser);
            localStorage.setItem('mdl_users', JSON.stringify(users));
            
            // Auto-login after registration
            currentUser = {email: email, name: name, id: newUser.id};
            currentRole = 'customer';
            
            closeLogin();
            showCustomerDashboard();
            showAlert('Account created successfully! Welcome, ' + name + '!', 'success');
        });
    }
    
    // Close login on outside click
    const overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeLogin();
        });
    }
    
    // Escape key to close login
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLogin();
    });
});

// === DASHBOARD FUNCTIONS ===

// Show customer dashboard
function showCustomerDashboard() {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    
    let dashboard = document.getElementById('customer-dashboard');
    if (!dashboard) {
        dashboard = document.createElement('section');
        dashboard.id = 'customer-dashboard';
        dashboard.className = 'page-section';
        dashboard.innerHTML = getCustomerDashboardHTML();
        document.body.insertBefore(dashboard, document.querySelector('footer'));
    }
    dashboard.classList.add('active');
    
    updateNavbarForUser('customer');
    loadCustomerOrders();
}

// Show admin dashboard
function showAdminDashboard() {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    
    let dashboard = document.getElementById('admin-dashboard');
    if (!dashboard) {
        dashboard = document.createElement('section');
        dashboard.id = 'admin-dashboard';
        dashboard.className = 'page-section';
        dashboard.innerHTML = getAdminDashboardHTML();
        document.body.insertBefore(dashboard, document.querySelector('footer'));
    }
    dashboard.classList.add('active');
    
    updateNavbarForUser('admin');
    loadAdminStats();
}

// === NAVBAR UPDATES ===

// Update navbar for logged-in users
function updateNavbarForUser(role) {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    if (role === 'customer') {
        nav.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('home')">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('shop')">Shop</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showCustomerDashboard()">My Account</a></li>
            <li class="nav-item ms-3">
                <button class="btn btn-outline-primary position-relative" onclick="toggleCart()">
                    <i class="bi bi-cart3"></i>
                    <span class="badge bg-danger cart-badge" id="cartCount">0</span>
                </button>
            </li>
            <li class="nav-item ms-2">
                <button class="btn btn-link text-decoration-none text-danger" onclick="logout()">
                    <i class="bi bi-box-arrow-right fs-5"></i>
                </button>
            </li>`;
    } else if (role === 'admin') {
        nav.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#" onclick="showAdminDashboard()">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('shop')">Products</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="alert('Orders module')">Orders</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="alert('Reports module')">Reports</a></li>
            <li class="nav-item ms-3">
                <span class="admin-badge me-2">ADMIN</span>
                <button class="btn btn-link text-decoration-none text-danger" onclick="logout()">
                    <i class="bi bi-box-arrow-right fs-5"></i> Logout
                </button>
            </li>`;
    }
    
    // Update cart badge if function exists
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
}

// Update navbar for guest users
function updateNavbarForGuest() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    nav.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('home')">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('shop')">Shop</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('about')">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('policies')">Policies</a></li>
        <li class="nav-item"><a class="nav-link" href="#" onclick="navigateTo('contact')">Contact</a></li>
        <li class="nav-item ms-3">
            <button class="btn btn-outline-primary position-relative" onclick="openLogin()">
                <i class="bi bi-person-circle"></i> Login
                <span class="badge bg-danger cart-badge" id="cartCount">0</span>
            </button>
        </li>`;
    
    // Update cart badge if function exists
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
}

// === LOGOUT ===

function logout() {
    currentUser = null;
    currentRole = null;
    
    const custDash = document.getElementById('customer-dashboard');
    const adminDash = document.getElementById('admin-dashboard');
    if (custDash) custDash.classList.remove('active');
    if (adminDash) adminDash.classList.remove('active');
    
    navigateTo('home');
    updateNavbarForGuest();
    showAlert('You have been logged out successfully.', 'info');
}

// === ALERT SYSTEM ===

function showAlert(message, type) {
    // Remove existing alerts
    const existing = document.querySelector('.auth-alert');
    if (existing) existing.remove();
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'error' ? 'danger' : type} auth-alert position-fixed top-0 start-50 translate-middle-x mt-4 z-3`;
    alert.style.zIndex = '10000';
    alert.innerHTML = `<i class="bi bi-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>${message}`;
    document.body.appendChild(alert);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        if (alert.parentNode) alert.remove();
    }, 4000);
}

// === DASHBOARD HTML GENERATORS ===

function getCustomerDashboardHTML() {
    const userName = currentUser?.name || 'Customer';
    return `
    <div class="dashboard-header">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold mb-1">My Account</h2>
                    <p class="mb-0 opacity-75">Welcome back, ${userName}</p>
                </div>
                <span class="customer-badge">CUSTOMER</span>
            </div>
        </div>
    </div>
    <div class="container pb-5">
        <div class="row">
            <div class="col-lg-3 mb-4">
                <div class="dashboard-card">
                    <h6 class="fw-bold mb-3">Account Menu</h6>
                    <div class="list-group list-group-flush">
                        <button class="list-group-item list-group-item-action active">📦 Order History</button>
                        <button class="list-group-item list-group-item-action">👤 Profile Settings</button>
                        <button class="list-group-item list-group-item-action">📍 Saved Addresses</button>
                        <button class="list-group-item list-group-item-action text-danger" onclick="logout()">🚪 Logout</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <div class="stat-card">
                            <div class="stat-number" id="cust-order-count">0</div>
                            <div class="stat-label">Total Orders</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card">
                            <div class="stat-number">R <span id="cust-spent">0</span></div>
                            <div class="stat-label">Total Spent</div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stat-card">
                            <div class="stat-number" id="cust-wishlist">0</div>
                            <div class="stat-label">Wishlist Items</div>
                        </div>
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold mb-0">Recent Orders</h5>
                        <button class="btn btn-sm btn-outline-primary">View All</button>
                    </div>
                    <div id="customer-orders-list">
                        <p class="text-muted text-center py-4">No orders yet. <a href="#" onclick="navigateTo('shop')">Start shopping!</a></p>
                    </div>
                </div>
                <div class="dashboard-card">
                    <h5 class="fw-bold mb-3">Quick Actions</h5>
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-outline-primary" onclick="navigateTo('shop')"><i class="bi bi-cart-plus me-1"></i> Shop Now</button>
                        <button class="btn btn-outline-success"><i class="bi bi-truck me-1"></i> Track Order</button>
                        <button class="btn btn-outline-info"><i class="bi bi-headset me-1"></i> Contact Support</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function getAdminDashboardHTML() {
    return `
    <div class="dashboard-header">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fw-bold mb-1">Admin Dashboard</h2>
                    <p class="mb-0 opacity-75">MDL SOLUTIONS Management Portal</p>
                </div>
                <span class="admin-badge">SUPERADMIN</span>
            </div>
        </div>
    </div>
    <div class="container pb-5">
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="stat-card border-start border-4 border-primary">
                    <div class="stat-number" id="admin-total-orders">127</div>
                    <div class="stat-label">Total Orders</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card border-start border-4 border-success">
                    <div class="stat-number">R 45,890</div>
                    <div class="stat-label">Today's Revenue</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card border-start border-4 border-info">
                    <div class="stat-number" id="admin-customers">89</div>
                    <div class="stat-label">Active Customers</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card border-start border-4 border-warning">
                    <div class="stat-number" id="admin-low-stock">3</div>
                    <div class="stat-label">Low Stock Alerts</div>
                </div>
            </div>
        </div>
        <div class="dashboard-card">
            <h5 class="fw-bold mb-3">Quick Actions</h5>
            <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-primary" onclick="alert('Add product form')"><i class="bi bi-plus-circle me-1"></i> Add Product</button>
                <button class="btn btn-success" onclick="alert('Process orders')"><i class="bi bi-check-circle me-1"></i> Process Orders</button>
                <button class="btn btn-info" onclick="alert('Generate report')"><i class="bi bi-bar-chart me-1"></i> Generate Report</button>
                <button class="btn btn-danger" onclick="logout()"><i class="bi bi-box-arrow-right me-1"></i> Logout</button>
            </div>
        </div>
    </div>`;
}

// === DATA LOADING (Demo) ===

function loadCustomerOrders() {
    const ordersList = document.getElementById('customer-orders-list');
    if (!ordersList) return;
    
    // Demo: Show cart items as "orders"
    if (typeof cart !== 'undefined' && cart.length > 0) {
        ordersList.innerHTML = cart.map((item, idx) => `
            <div class="border rounded p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <strong>Order #ORD-${1000 + idx}</strong>
                    <span class="badge bg-success">Processing</span>
                </div>
                <p class="small mb-1">${item.name} × ${item.quantity}</p>
                <div class="d-flex justify-content-between small">
                    <span class="text-muted">${new Date().toLocaleDateString()}</span>
                    <strong>R ${(item.price * item.quantity).toLocaleString()}</strong>
                </div>
            </div>
        `).join('');
        
        document.getElementById('cust-order-count').textContent = cart.length;
        document.getElementById('cust-spent').textContent = cart.reduce((s,i) => s + i.price * i.quantity, 0).toLocaleString();
    }
}

function loadAdminStats() {
    // Demo stats
    document.getElementById('admin-total-orders').textContent = '127';
    document.getElementById('admin-customers').textContent = '89';
    document.getElementById('admin-low-stock').textContent = '3';
}

// === EXPORT FUNCTIONS FOR OTHER MODULES ===

// Make functions available globally for index.html
if (typeof window !== 'undefined') {
    window.openLogin = openLogin;
    window.closeLogin = closeLogin;
    window.switchLoginTab = switchLoginTab;
    window.switchToRegistration = switchToRegistration;
    window.switchToLogin = switchToLogin;
    window.showCustomerDashboard = showCustomerDashboard;
    window.showAdminDashboard = showAdminDashboard;
    window.updateNavbarForUser = updateNavbarForUser;
    window.updateNavbarForGuest = updateNavbarForGuest;
    window.logout = logout;
    window.showAlert = showAlert;
}