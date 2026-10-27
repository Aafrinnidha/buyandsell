
let products = [
    {
        name: "Laptop",
        price: 15000,
        category: "Electronics",
        description: "Laptop in good condition",
        emoji: "💻",
        image: "",
        contact: ""
    },
    {
        name: "Headphones",
        price: 800,
        category: "Electronics",
        description: "Headphones in good condition",
        emoji: "🎧",
        image: "",
        contact: ""
    },
    {
        name: "Books",
        price: 300,
        category: "Books",
        description: "Used books",
        emoji: "📚",
        image: "",
        contact: ""
    },
    {
        name: "Study Table",
        price: 2500,
        category: "Furniture",
        description: "Used study table",
        emoji: "🪑",
        image: "",
        contact: ""
    },
    {
        name: "Mobile Phone",
        price: 12000,
        category: "Electronics",
        description: "Used smartphone",
        emoji: "📱",
        image: "",
        contact: ""
    },
    {
        name: "Backpack",
        price: 500,
        category: "Clothing",
        description: "Used backpack",
        emoji: "🎒",
        image: "",
        contact: ""
    }
];

const productsPage = document.getElementById("products-page");
const sellPage = document.getElementById("sell-page");
const productList = document.getElementById("product-list");
const form = document.getElementById("sell-form");

function showProducts() {
    sellPage.hidden = true;
    productsPage.hidden = false;
    displayProducts();
    window.scrollTo(0, 0);
}

function showSellPage() {
    productsPage.hidden = true;
    sellPage.hidden = false;
    window.scrollTo(0, 0);
}

function displayProducts() {
    let search = document.getElementById("search").value.toLowerCase();

    productList.innerHTML = "";

    let filtered = products.filter(function(product) {
        return product.name.toLowerCase().includes(search);
    });

    if (filtered.length === 0) {
        productList.textContent = "No products found.";
        return;
    }

    filtered.forEach(function(product) {
        let card = document.createElement("div");
        card.className = "product-card";

        let picture = document.createElement("div");
        picture.className = "product-image";

        if (product.image) {
            let img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;

            img.onerror = function() {
                picture.textContent = product.emoji || "📦";
            };

            picture.appendChild(img);
        } else {
            picture.textContent = product.emoji || "📦";
        }

        let title = document.createElement("h3");
        title.textContent = product.name;

        let price = document.createElement("p");
        price.className = "price";
        price.textContent = product.price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        });

        let category = document.createElement("p");
        category.textContent = product.category;

        let description = document.createElement("p");
        description.textContent = product.description;

        let button = document.createElement("button");
        button.textContent = "Contact Seller";

        button.onclick = function() {
            if (!product.contact) {
                alert("Seller contact is unavailable for this sample product.");
            } else {
                alert("Seller contact: " + product.contact);
            }
        };

        card.append(
            picture,
            title,
            price,
            category,
            description,
            button
        );

        productList.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input", displayProducts);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("category").value;
    let image = document.getElementById("image").value.trim();
    let description = document.getElementById("description").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!name || !description || price <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    products.unshift({
        name: name,
        price: price,
        category: category,
        description: description,
        image: image,
       emoji: "👗",
        contact: contact
    });

    form.reset();

    document.getElementById("message").textContent =
        "Product added successfully!";

    document.getElementById("search").value = "";

    showProducts();
});

displayProducts();
