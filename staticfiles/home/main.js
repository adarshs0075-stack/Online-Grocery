let count = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const plusIcons = document.querySelectorAll('.add-to-cart-btn');
    const minusIcons = document.querySelectorAll('.remove-from-cart-btn');
    const likeIcons = document.querySelectorAll('.like-btn');
    const SearchInputs = document.getElementById('search-input');
    const productCard = document.querySelectorAll('.h-pic');



    plusIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            count++;
            if (cartCountElement) {
                cartCountElement.textContent = count;
            }
            alert("Item Added to Cart!");
        });
    });

    minusIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (count > 0) {
                count--;
                if (cartCountElement) {
                    cartCountElement.textContent = count;
                }
            }
        });
    });
    likeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('liked');
        })
    })
    if (SearchInputs) {
        SearchInputs.addEventListener('input', (e) =>{
            const searchTerm = e.target.value.tolowerCase();
            productCard.forEach(card => {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    const productName = titleElement.textContent.toLowerCase();
                    if (productName.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
});
function openPaymentModal(price) {
    document.getElementById('payAmount').innerText = price;
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
    let method = document.getElementById('payMethod').value;
    let amount = document.getElementById('payAmount').innerText;
    
    alert("Processing payment of ₹" + amount + " via " + method.toUpperCase() + "...");
    
    setTimeout(() => {
        alert("🎉 Order Placed Successfully!");
        closePaymentModal();
    }, 1000);
}
function toggleMoreProducts() {
    let extraProducts = document.querySelectorAll('.extra-product');
    let btn = document.getElementById('viewMoreBtn');

    let isHidden = extraProducts[0].style.display === '' || extraProducts[0].style.display === 'none';

    extraProducts.forEach(product => {
        if (isHidden) {
            product.classList.add('show');
            product.style.display = 'block';
        } else {
            product.classList.remove('show');
            product.style.display = 'none';
        }
    });
    if (isHidden) {
        btn.innerText = "Show Less";
    } else {
        btn.innerText = "View All Product";
    }
}
let cart = [];

function toggleCartDrawer() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('active');
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: parseFloat(price), quantity: 1 });
    }

    updateCartUI();
    showToast(`${name} added to cart!`);

    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
}


function updateQuantity(name, change) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    let cartList = document.getElementById('cartItemsList');
    let totalCount = 0;
    totalPrice = 0;

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            cartList.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4 style="margin:0">${item.name}</h4>
                        <small>₹${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span style="margin: 0 6px;">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('cartCount').innerText = totalCount;
    document.getElementById('cartTotalPrice').innerText = `₹${totalPrice.toFixed(2)}`;
}

function showToast(message) {
    let container = document.getElementById('toastContainer');
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 50);

    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function filterCategory(category) {
    const cards = document.querySelectorAll('.h-pic');
    const links = document.querySelectorAll('.menu-items a');


    links.forEach(link => {
        if (link.getAttribute('data-filter') === category) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}