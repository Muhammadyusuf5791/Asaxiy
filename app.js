// Yurak belgilarini olish
const heart1 = document.querySelectorAll('.bx-heart');
const heart2 = document.querySelectorAll('.bxs-heart');

// Saqlangan holatlarni olish
let savedHearts = JSON.parse(localStorage.getItem('hearts')) || [];

// Yuraklar holatini tiklash
heart1.forEach((heart, index) => {
  if (savedHearts[index]) {
    heart.style.display = 'none';
    heart2[index].style.display = 'inline';
  } else {
    heart.style.display = 'inline';
    heart2[index].style.display = 'none';
  }
});

// Yuraklarga bosish
heart1.forEach((heart, index) => {
  heart.addEventListener('click', () => {
    heart.style.display = 'none';
    heart2[index].style.display = 'inline';
    savedHearts[index] = true;
    localStorage.setItem('hearts', JSON.stringify(savedHearts));
  });
});

heart2.forEach((heart, index) => {
  heart.addEventListener('click', () => {
    heart.style.display = 'none';
    heart1[index].style.display = 'inline';
    savedHearts[index] = false;
    localStorage.setItem('hearts', JSON.stringify(savedHearts));
  });
});

// Savatcha
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Element chaqirish uchun qisqa usul
const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  // Mahsulot tugmalari
  $("img1").addEventListener("click", () => addToCart("Mashaqqatli xayot...", 45, "/assets/img1.jpeg"));
  $("img2").addEventListener("click", () => addToCart("Ilgor Faxmiy: Aktrisa", 19, "/assets/img2.jpeg"));
  $("img3").addEventListener("click", () => addToCart("Rahmat Fayziy: Hazrati inson", 39, "/assets/img3.jpeg"));
  $("img4").addEventListener("click", () => addToCart("Kabutarlar baland uchadi...", 19, "/assets/img4.jpeg"));
  $("img5").addEventListener("click", () => addToCart("Kabutarlar baland uchadi...", 16, "/assets/img5.jpeg"));
  $("img6").addEventListener("click", () => addToCart("Sevgim mening, Sevgilim...", 25, "/assets/img6.jpeg"));

  // Savatchani ochish
  $("cart-icon").addEventListener("click", toggleCart);

  // Tozalash tugmasi
  $("clear-cart").addEventListener("click", clearCart);

  // Sahifa yuklanganda savatchani yangilash
  updateCart();
});

// Scroll bo‘lsa modalni yopish
window.addEventListener("scroll", () => {
  $("cart-modal").style.display = "none";
});

// Savatchani ko‘rsatish/yopish
function toggleCart() {
  const modal = $("cart-modal");
  modal.style.display = (modal.style.display === "none" || modal.style.display === "") ? "block" : "none";
}

// Mahsulot qo‘shish
function addToCart(name, price, image) {
  let product = cart.find(item => item.name === name);
  if (product) {
    product.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  updateCart();
}

// Savatchani yangilash
function updateCart() {
  const cartItems = $("cart-items");
  const cartCount = $("cart-count");
  const cartCountModal = $("cart-count-modal");
  const totalPrice = $("total-price");

  cartItems.innerHTML = "";
  let total = 0, count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <p>${item.name}</p>
        <p>${item.price}</p>
      </div>
      <div class="quantity">
        <button class="change-qty" data-name="${item.name}" data-change="-1">-</button>
        <span>${item.quantity}</span>
        <button class="change-qty" data-name="${item.name}" data-change="1">+</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });

  cartCount.textContent = count;
  cartCountModal.textContent = count;
  totalPrice.textContent = total.toFixed(2);

  // Tugmalarga qayta event biriktirish
  document.querySelectorAll(".change-qty").forEach(button => {
    button.addEventListener("click", () => changeQuantity(button.dataset.name, parseInt(button.dataset.change)));
  });

  // Saqlash
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Miqdorni o‘zgartirish
function changeQuantity(name, change) {
  let product = cart.find(item => item.name === name);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.name !== name);
    }
    updateCart();
  }
}

// Savatchani tozalash
function clearCart() {
  cart = [];
  updateCart();
}
