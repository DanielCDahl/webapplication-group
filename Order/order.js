const orderForm = document.getElementById("orderForm");
const successMessage = document.getElementById("successMessage");

const selectedProductCard = document.getElementById("selectedProductCard");
const selectedProductTitle = document.getElementById("selectedProductTitle");
const selectedProductPrice = document.getElementById("selectedProductPrice");
const productError = document.getElementById("productError");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  street: document.getElementById("street"),
  postcode: document.getElementById("postcode"),
  city: document.getElementById("city")
};

const errors = {
  name: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  phone: document.getElementById("phoneError"),
  street: document.getElementById("streetError"),
  postcode: document.getElementById("postcodeError"),
  city: document.getElementById("cityError")
};

let selectedProduct = null;

async function loadSelectedProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  if (!productId) {
    productError.textContent = "No product selected. Please choose a product from the Products page.";
    return;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

    if (!response.ok) {
      throw new Error("Could not fetch product");
    }

    selectedProduct = await response.json();

    selectedProductTitle.textContent = selectedProduct.title;
    selectedProductPrice.textContent = `Price: $${selectedProduct.price}`;
    selectedProductCard.classList.remove("d-none");
    productError.textContent = "";
  } catch (error) {
    console.error(error);
    productError.textContent = "Could not load selected product.";
  }
}

function setError(field, message) {
  field.classList.add("is-invalid");
  field.classList.remove("is-valid");
  errors[field.id].textContent = message;
}

function setSuccess(field) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  errors[field.id].textContent = "";
}

function validateName() {
  const value = fields.name.value.trim();

  if (value.length < 2) {
    setError(fields.name, "Name must contain at least 2 characters.");
    return false;
  }

  if (value.length > 50) {
    setError(fields.name, "Name may contain a maximum of 50 characters.");
    return false;
  }

  setSuccess(fields.name);
  return true;
}

function validateEmail() {
  const value = fields.email.value.trim();

  if (value.length === 0) {
    setError(fields.email, "Email is required.");
    return false;
  }

  if (!value.includes("@")) {
    setError(fields.email, "Email must include @.");
    return false;
  }

  if (value.length > 50) {
    setError(fields.email, "Email may contain a maximum of 50 characters.");
    return false;
  }

  setSuccess(fields.email);
  return true;
}

function validatePhone() {
  const value = fields.phone.value.trim();
  const phonePattern = /^[0-9\-()]+$/;

  if (value.length === 0) {
    setError(fields.phone, "Phone number is required.");
    return false;
  }

  if (value.length > 20) {
    setError(fields.phone, "Phone number may contain a maximum of 20 characters.");
    return false;
  }

  if (!phonePattern.test(value)) {
    setError(fields.phone, "Phone may only include digits, -, and ().");
    return false;
  }

  setSuccess(fields.phone);
  return true;
}

function validateStreet() {
  const value = fields.street.value.trim();

  if (value.length < 2) {
    setError(fields.street, "Street address must contain at least 2 characters.");
    return false;
  }

  if (value.length > 50) {
    setError(fields.street, "Street address may contain a maximum of 50 characters.");
    return false;
  }

  setSuccess(fields.street);
  return true;
}

function validatePostcode() {
  const value = fields.postcode.value.trim();

  if (!/^\d{5}$/.test(value)) {
    setError(fields.postcode, "Post code must contain exactly 5 digits.");
    return false;
  }

  setSuccess(fields.postcode);
  return true;
}

function validateCity() {
  const value = fields.city.value.trim();

  if (value.length < 2) {
    setError(fields.city, "City must contain at least 2 characters.");
    return false;
  }

  if (value.length > 20) {
    setError(fields.city, "City may contain a maximum of 20 characters.");
    return false;
  }

  setSuccess(fields.city);
  return true;
}

fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.phone.addEventListener("input", validatePhone);
fields.street.addEventListener("input", validateStreet);
fields.postcode.addEventListener("input", validatePostcode);
fields.city.addEventListener("input", validateCity);

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successMessage.classList.add("d-none");

  if (!selectedProduct) {
    productError.textContent = "Please select a product from the Products page before ordering.";
    return;
  }

  const isValid =
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateStreet() &&
    validatePostcode() &&
    validateCity();

  if (isValid) {
    successMessage.classList.remove("d-none");
    successMessage.textContent = `Thank you! Your order for "${selectedProduct.title}" has been placed.`;

    orderForm.reset();

    Object.values(fields).forEach((field) => {
      field.classList.remove("is-valid");
    });
  }
});

loadSelectedProduct();