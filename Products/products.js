const productList = document.getElementById("productList");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

async function loadProducts() {
  try {
    console.log("Loading products...");

    const response = await fetch("https://fakestoreapi.com/products");

    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const products = await response.json();
    console.log("Products:", products);

    loadingMessage.classList.add("d-none");
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    loadingMessage.classList.add("d-none");
    errorMessage.classList.remove("d-none");
    errorMessage.textContent =
      "Could not load products. Check that you are running the page through Live Server or localhost.";
  }
}

function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img
          src="${product.image}"
          class="card-img-top product-image"
          alt="${product.title}"
        />
        <div class="card-body d-flex flex-column">
          <h2 class="h5">${product.title}</h2>
          <p class="text-muted">${shortenText(product.description, 100)}</p>
          <p class="mb-2"><strong>Category:</strong> ${product.category}</p>
          <p class="mb-3"><strong>Price:</strong> $${product.price}</p>
          <a href="../order/order.html?productId=${product.id}" class="btn btn-primary mt-auto">
            Order this product
          </a>
        </div>
      </div>
    `;

    productList.appendChild(col);
  });
}

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

loadProducts();