// ===============================
// MY ICE - WEBSITE JAVASCRIPT
// ===============================

let cart = [];


// ADD PRODUCT TO CART
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Small notification
    showNotification(name + " added to cart 🍦");
}


// UPDATE CART
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = "₹" + totalPrice;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 🍦
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                <small>
                    ₹${item.price} × ${item.quantity}
                </small>
            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(itemElement);
    });
}


// REMOVE ITEM
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// OPEN CART
function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    updateCart();
}


// CLOSE CART
function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// CHECKOUT
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty! 🍦");

        return;
    }


    let message = "Hello MY ICE! 🍦%0A%0AI want to order:%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
            `${item.name} × ${item.quantity} = ₹${itemTotal}%0A`;
    });


    message += `%0ATotal: ₹${total}`;

    // CHANGE THIS NUMBER TO YOUR SHOP WHATSAPP NUMBER
    const phoneNumber = "919876543210";

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );
}


// MOBILE MENU
function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("active");
}


// OFFER BUTTON
function showOffer() {

    alert(
        "🎉 TODAY'S SPECIAL 🎉\n\n" +
        "Buy 2 Scoops and Get 1 Scoop FREE!\n\n" +
        "Visit MY ICE today 🍦"
    );
}


// NOTIFICATION
function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.background = "#292525";
    notification.style.color = "white";
    notification.style.padding = "13px 20px";
    notification.style.borderRadius = "30px";
    notification.style.zIndex = "5000";
    notification.style.fontSize = "13px";
    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";

    document.body.appendChild(notification);


    setTimeout(() => {

        notification.remove();

    }, 2500);
}


// CLOSE CART WHEN CLICKING OUTSIDE
document
    .getElementById("cartOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeCart();
        }

    });