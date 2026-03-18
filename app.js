// app.js

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 1499,
        image: "alejandro-luengo-CCbxJI3Y2xA-unsplash.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "jens-kreuter-PKnn-nXCNhs-unsplash.jpg"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 1799,
        image: "nejc-soklic-g5Y5kjOwGwQ-unsplash.jpg"
    },
    {
        id: 4,
        name: "Gaming Mouse",
        price: 899,
        image: "nerfee-mirandilla-2mBKkeklHbI-unsplash.jpg"
    },
    {
        id: 5,
        name: "LAPTOP",
        price: 55999,
        image: "alex-knight-j4uuKnN43_M-unsplash.jpg"
    },
    {
        id: 6,
        name: "smartphone",
        price: 19999,
        image: "jotform-aixOEgcoU6c-unsplash.jpg"
    },
    {
        id: 7,
        name: "DSLR Camera",
        price: 45999,
        image: "clement-remond-BB2G2cfdXKE-unsplash.jpg"
    },
    {
        id: 8,
        name: "Fitness Tracker",
        price: 2999,
        image: "nikita-kostrykin-5--lSW0MiE0-unsplash.jpg"
    },
    {
        id: 9,
        name: "4K Monitor",
        price: 15999,
        image: "pew-nguyen-mesCNL9gikI-unsplash.jpg"
    },
    {
        id: 10,
        name: "Mechanical Keyboard",
        price: 4999,
        image: "pedro-costa-aXY5doQNZTc-unsplash.jpg"
    },
    {
        id: 11,
        name: "External Hard Drive",
        price: 6499,
        image: "hosein-zanbori-FIFhOXkhAw4-unsplash (1).jpg"
    },
    {
        id: 12,
        name: "Tablet", 
        price: 12999,
        image: "serwin365-0cG_yQAdYIM-unsplash.jpg"
    },
    {
        id: 13,
        name: "projector", 
        price: 21999,
        image: "dylan-calluy-WU4ek4KCyjw-unsplash.jpg"
    },
    {
        id: 14,
        name: "fan",
        price: 2999,
        image: "valery-fedotov-vFWciisio5g-unsplash.jpg"    },
    {
        id: 15,
        name: "Wireless Headphones",
        price: 3499,
        image: "cosmin-ursea-0QAe85hi_Mw-unsplash.jpg"
    },
    {
        id: 16,
        name: "USB-C Hub",
        price: 1899,
        image: "lasse-jensen-4nVJUZEJb3s-unsplash.jpg"
    },
    {
        id: 17,
        name: "HD Webcam",
        price: 2299,
        image: "emiliano-cicero-lq87UxGSiEQ-unsplash.jpg"
    },
    {
        id: 18,
        name: "Gaming Laptop",
        price: 89999,
        image: "pew-nguyen-mesCNL9gikI-unsplash - Copy.jpg"
    },
    {
        id: 19,
        name: "Portable Power Bank",
        price: 1299,
        image: "kamil-switalski-90RPBQtkgXI-unsplash.jpg"
    },
    {
        id: 20,
        name: "SSD Storage 1TB",
        price: 4999,
        image: "theregisti-Zi30YbQehyE-unsplash.jpg"
    },
    {
        id: 21,
        name: "Graphics Card RTX",
        price: 34999,
        image: "christian-wiediger-3GUW88tRmv8-unsplash.jpg"
    },
    {
        id: 22,
        name: "WiFi Router 6",
        price: 4499,
        image: "user_pascal-mTm0YLorp1Y-unsplash.jpg"
    },
    {
        id: 23,
        name: "Wireless Charger",
        price: 999,
        image: "james-yarema-MVin7poIsoM-unsplash.jpg"
    },
    {
        id: 24,
        name: "Portable Speaker",
        price: 2199,
        image: "shawn-rain-fwRmAH4V3-g-unsplash.jpg"
    },
    {
        id: 25,
        name: "USB Microphone",
        price: 1599,
        image: "bruno-yamazaky-tfvHa05DyT8-unsplash.jpg"
    },
];

// Grab product list container
const productList = document.getElementById("product-list");

async function fetchProductsFromApi() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('API error');
        return await res.json();
    } catch (err) {
        return null; // let caller fall back to local `products`
    }
}

function renderProducts(list) {
    productList.innerHTML = '';
    list.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <div style="display:flex;gap:10px;width:100%;max-width:250px;">
                <button onclick="addToCart(${product.id})" style="flex:1;padding:8px;background:#0078d7;color:#fff;border:none;cursor:pointer;font-size:0.9rem;font-weight:600;transition:background 0.3s;" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#0078d7'">Add Cart</button>
                <button onclick="buyNow(${product.id})" style="flex:1;padding:8px;background:#ff6b35;color:#fff;border:none;cursor:pointer;font-size:0.9rem;font-weight:600;transition:background 0.3s;" onmouseover="this.style.background='#ff5520'" onmouseout="this.style.background='#ff6b35'">Buy Now</button>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

function saveCartToLocal(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartFromLocal() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function updateCartBadge() {
    const cart = getCartFromLocal();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

async function buyNow(id) {
    const product = (await fetchProductsFromApi())?.find(p => p.id === id) || products.find(p => p.id === id);
    if (!product) return alert('Product not found');

    // Create new cart with just this item
    const cart = [{ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    saveCartToLocal(cart);
    updateCartBadge();

    // Go to checkout
    window.location.href = 'checkout.html';
}

async function addToCart(id) {
    const product = (await fetchProductsFromApi())?.find(p => p.id === id) || products.find(p => p.id === id);
    if (!product) return alert('Product not found');

    // update local cart
    const cart = getCartFromLocal();
    const existing = cart.find(i => i.id === product.id);
    if (existing) existing.quantity = (existing.quantity || 1) + 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    saveCartToLocal(cart);
    updateCartBadge();

    // attempt to notify backend (best-effort)
    try {
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: 'guest', item: { id: product.id, name: product.name, price: product.price, image: product.image } })
        });
    } catch (err) {
        // ignore network errors — local cart remains authoritative
    }

    const goToCart = confirm(`${product.name} added to cart!\n\nGo to cart now?`);
    if (goToCart) window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    const remote = await fetchProductsFromApi();
    renderProducts(remote || products);
    updateCartBadge();
});