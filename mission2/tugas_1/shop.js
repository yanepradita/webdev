let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'High Heels Red Bottoms',
        image: 'Model1.jpg',
        price: 350000,
    },
    {
        id: 2,
        name: 'High Heels Pantofel',
        image: 'Model2.jpg',
        price: 300000,
    },
    {
        id: 3,
        name: 'Wide Strap Heels',
        image: 'Model3.jpg',
        price: 290000,
    },
    {
        id: 4,
        name: 'Slingback Block Heels',
        image: 'Model4.jpg',
        price: 530000,
    },
    {
        id: 5,
        name: 'Ankle Strap Heels',
        image: 'Model5.jpg',
        price: 380000,
    },
    {
        id: 6,
        name: 'Ankle Strap Heels',
        image: 'Model6.jpg',
        price: 400000,
    },
];

let listCarts = {};

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.dataset.key = key;
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <div>
                <button onclick="decrementQuantity(${key})">-</button>
                <input type="number" id="quantity_${key}" placeholder="Quantity" min="0" value="0">
                <button onclick="incrementQuantity(${key})">+</button>
                <button class="add-to-cart-button" onclick="addToCart(${key})">Add To Cart</button>
            </div>
            <div class="count">0</div>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function incrementQuantity(key) {
    const quantityInput = document.getElementById(`quantity_${key}`);
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = (currentValue + 1).toString();
}

function decrementQuantity(key) {
    const quantityInput = document.getElementById(`quantity_${key}`);
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 0) {
        quantityInput.value = (currentValue - 1).toString();
    }
}

function addToCart(key) {
    const quantityInput = document.getElementById(`quantity_${key}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        if (listCarts[key] == null) {
            listCarts[key] = JSON.parse(JSON.stringify(products[key]));
            listCarts[key].quantity = quantity;
        } else {
            listCarts[key].quantity += quantity;
        }
        updateQuantityDisplay(key);
        quantityInput.value = "0"; // Reset input quantity ke 0 setelah ditambahkan ke keranjang
        reloadCart();
    }
}

function updateQuantityDisplay(key) {
    const quantityElement = document.querySelector(`.item[data-key="${key}"] .count`);
    quantityElement.innerText = listCarts[key].quantity.toString();
}

function reloadCart() {
    listCart.innerHTML = ''; // Mengosongkan elemen listCart sebelum memuat item baru
    let subtotal = 0;
    let count = 0;

    Object.keys(listCarts).forEach((key) => {
        const value = listCarts[key];
        const newDiv = document.createElement('li');
        const itemTotal = value.price * value.quantity;
        subtotal += itemTotal;

        newDiv.innerHTML = `
            <div><img src="img/${value.image}" alt="${value.name}"/></div>
            <div><h1>${value.name}</h1></div>
            <div><h2>${value.price.toLocaleString()}</h2></div>
            <div>${value.quantity}</div>
            <div><h3>Total Harga : ${itemTotal.toLocaleString()}</h3></div>
        `;

        listCart.appendChild(newDiv);
        count += value.quantity;
    });

    const taxRate = 0.11; // Pajak 11%
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    // Tambahkan elemen pajak ke keranjang belanja
    const taxDiv = document.createElement('li');
    taxDiv.innerHTML = `
        <div><h4>Pajak 11% :</h4></div>
        <div><h4>${taxAmount.toLocaleString()}</h4></div>
    `;
    listCart.appendChild(taxDiv);

    // Perbarui elemen dengan class "total" dan class "quantity"
    const totalElem = document.querySelector('.total');
    const quantityElem = document.querySelector('.quantity'); 

    totalElem.innerText = totalAmount.toLocaleString();
    quantityElem.innerText = count;
}

