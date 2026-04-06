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

// Hämta vald produkt från URL
async function loadSelectedProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");

  if (!productId) {
    productError.textContent = "No product selected. Please choose a product first.";
    productError.classList.remove("d-none");
    return;
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) throw new Error("Could not fetch product");

    selectedProduct = await response.json();

    selectedProductTitle.textContent = selectedProduct.title;
    selectedProductPrice.textContent = `Price: $${selectedProduct.price}`;
    selectedProductCard.classList.remove("d-none");
    productError.classList.add("d-none");
  } catch (error) {
    productError.textContent = "Failed to load product.";
    productError.classList.remove("d-none");
  }
}


function setError(field, msg) { field.classList.add("is-invalid"); errors[field.id].textContent = msg; return false; }
function setSuccess(field) { field.classList.remove("is-invalid"); errors[field.id].textContent = ""; return true; }

function validateName() { 
  const v = fields.name.value.trim(); 
  if(v.length<2) return setError(fields.name,"Name must be at least 2 chars"); 
  return setSuccess(fields.name);
}
function validateEmail(){ 
  const v = fields.email.value.trim();
  if(!v.includes("@")) return setError(fields.email,"Invalid email"); 
  return setSuccess(fields.email);
}
function validatePhone(){ 
  const v = fields.phone.value.trim(); 
  if(!/^[0-9\-()]+$/.test(v)) return setError(fields.phone,"Invalid phone"); 
  return setSuccess(fields.phone);
}
function validateStreet(){ return fields.street.value.trim().length<2? setError(fields.street,"Street too short"):setSuccess(fields.street);}
function validatePostcode(){ return !/^\d{5}$/.test(fields.postcode.value.trim())? setError(fields.postcode,"Postcode must be 5 digits"):setSuccess(fields.postcode);}
function validateCity(){ return fields.city.value.trim().length<2? setError(fields.city,"City too short"):setSuccess(fields.city);}

// Lägg på input-event
Object.keys(fields).forEach(k=>{
  fields[k].addEventListener("input", ()=>{ 
    eval("validate"+k.charAt(0).toUpperCase()+k.slice(1))(); 
  });
});

orderForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(!selectedProduct) return;

  const valid = validateName()&&validateEmail()&&validatePhone()&&validateStreet()&&validatePostcode()&&validateCity();
  if(!valid) return;

  
  const order = {
    product: selectedProduct,
    customer: {
      name: fields.name.value,
      email: fields.email.value,
      phone: fields.phone.value,
      street: fields.street.value,
      postcode: fields.postcode.value,
      city: fields.city.value
    }
  };

 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(order);
  localStorage.setItem("cart", JSON.stringify(cart));

  
  successMessage.innerHTML = `
    <strong>Order placed successfully!</strong><br>
    <strong>Product:</strong> ${selectedProduct.title} ($${selectedProduct.price})<br>
    <strong>Name:</strong> ${fields.name.value}<br>
    <strong>Email:</strong> ${fields.email.value}<br>
    <strong>Phone:</strong> ${fields.phone.value}<br>
    <strong>Address:</strong> ${fields.street.value}, ${fields.postcode.value} ${fields.city.value}
  `;
  successMessage.classList.remove("d-none");

  orderForm.reset();
  Object.values(fields).forEach(f=>f.classList.remove("is-valid"));
});

loadSelectedProduct();