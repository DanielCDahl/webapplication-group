const productList = document.getElementById("productList");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

async function loadProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("HTTP error " + response.status);

    const data = await response.json();
    const products = data.products;

    loadingMessage.classList.add("d-none");
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    loadingMessage.classList.add("d-none");
    errorMessage.classList.remove("d-none");
  }
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />
        <div class="card-body d-flex flex-column">
          <h2 class="h5">${product.title}</h2>
          <p class="text-muted">${product.description.substring(0, 80)}...</p>
          <p><strong>Price:</strong> $${product.price}</p>
          <a href="../Order/order.html?productId=${product.id}" class="btn btn-primary mt-auto">Order this product</a>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

loadProducts();