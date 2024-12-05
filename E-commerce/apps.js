document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const cartIcon = document.querySelector(".cart-icon");
    const sideBar = document.querySelector("#sidebar");
    const sidebarClose = document.querySelector(".sidebar-close");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");
    const cartCounts = document.querySelector('.cart-icon span');

    let cart = []; // Array to store cart items

    // Toggle sidebar visibility
    cartIcon.addEventListener("click", () => {
        sideBar.classList.toggle("open");
    });

    // Close the sidebar
    sidebarClose.addEventListener("click", () => {
        sideBar.classList.remove("open");
    });

    const products = [
        "ACER-Nitro V",
        "ACER-CB315-4H-C8XU",
        "APPLE-A2141",
        "APPLE-MacBook Pro",
        "HP-TPN-Q221",
        "HP-Chromebook",
        "HP",
        "DELL",
        "ACER-Predator Helios",
        "ACER-CB315-4H-C8XU",
      ];
      
      // DOM Elements
      const searchBar = document.getElementById("search-bar");
      const suggestions = document.getElementById("suggestions");
      
      // Event Listener for Search Bar Input
      searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        suggestions.innerHTML = ""; // Clear previous suggestions
      
        if (query) {
          const filteredProducts = products.filter(product =>
            product.toLowerCase().includes(query)
          );
      
          filteredProducts.forEach(product => {
            const li = document.createElement("li");
            li.textContent = product;
      
            // Add click functionality to suggestions
            li.addEventListener("click", () => {
              searchBar.value = product; // Fill input with selected product
              suggestions.innerHTML = ""; // Clear dropdown
            });
      
            suggestions.appendChild(li);
          });
        }
      });

    
    
    // Add click event to each "add to cart" button
    let cartItemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItemCount++; // Increment the count
            cartCounts.textContent = cartItemCount; // Update the cart icon count
        });
    });


    // Add item to cart
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const itemName = card.querySelector("h4").textContent;
            const itemPrice = parseFloat(
                card.querySelector(".price").textContent.replace("$", "")
            );
            const itemImg = card.querySelector("img").src;

            // Check if item is already in the cart
            const existingItem = cart.find((item) => item.name === itemName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, img: itemImg, quantity: 1 });
            }

            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            // Create cart item element
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Update total
        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Add remove functionality to new buttons
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const itemName = e.target.dataset.name;
                cart = cart.filter((item) => item.name !== itemName);
                updateCart();
            });
        });
    }
});

// FORM 

 const cancel = document.querySelector("#cancelBtn");
 const submit = document.querySelector("#submitBtn");
 const names = document.querySelector("#nameInput");
 const address = document.querySelector("#addressInput");
 const contact = document.querySelector("#contactInput");
 const email = document.querySelector("#emailInput");
 


 document.getElementById("cancelBtn").addEventListener("click", (event) => {
    event.preventDefault(); // Prevents the form submission
    window.location.href = "index.html"; // Navigates to the main page
});


 submit.onclick = function(){
    const nameValue = names.value.trim();
    const addressValue = address.value.trim();
    const contactValue = contact.value.trim();
    const emailValue = email.value.trim();

    // Check if any field is empty
    if (nameValue === "" || addressValue === "" || contactValue === "" || emailValue === "") {
        alert("Enter your details!"); // Use alert to notify the user
    } else {
        alert("Submitted successfully! Our contact center will contact you for payment details. Thank you"); // Show success alert
        console.log("Form submitted with the following details:");
        console.log("Name:", nameValue);
        console.log("Address:", addressValue);
        console.log("Contact:", contactValue);
        console.log("Email:", emailValue);

        // Optionally, reset the form after successful submission
        names.value = "";
        address.value = "";
        contact.value = "";
        email.value = "";
    }
    
 }