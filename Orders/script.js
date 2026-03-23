const form = document.getElementById("orderForm");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    street: document.getElementById("street"),
    postcode: document.getElementById("postcode"),
    city: document.getElementById("city"),
    product: document.getElementById("product")
};

const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    street: document.getElementById("streetError"),
    postcode: document.getElementById("postcodeError"),
    city: document.getElementById("cityError"),
    product: document.getElementById("productError")
};

const successMessage = document.getElementById("successMessage");

function setError(field, message) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    errors[field.name].textContent = message;
}

function setSuccess(field) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    errors[field.name].textContent = "";
}

function clearValidation(field) {
    field.classList.remove("is-invalid", "is-valid");
    errors[field.name].textContent = "";
}

function validateName() {
    const value = fields.name.value.trim();

    if (value.length === 0) {
        setError(fields.name, "Name is required.");
        return false;
    }

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
        setError(fields.email, "Email address is required.");
        return false;
    }

    if (value.length > 50) {
        setError(fields.email, "Email address may contain a maximum of 50 characters.");
        return false;
    }

    if (!value.includes("@")) {
        setError(fields.email, "Email address must include @.");
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
        setError(fields.phone, "Phone number may only include digits, -, and ().");
        return false;
    }

    setSuccess(fields.phone);
    return true;
}

function validateStreet() {
    const value = fields.street.value.trim();

    if (value.length === 0) {
        setError(fields.street, "Street address is required.");
        return false;
    }

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
    const postcodePattern = /^\d{5}$/;

    if (value.length === 0) {
        setError(fields.postcode, "Post code is required.");
        return false;
    }

    if (!postcodePattern.test(value)) {
        setError(fields.postcode, "Post code must contain exactly 5 digits.");
        return false;
    }

    setSuccess(fields.postcode);
    return true;
}

function validateCity() {
    const value = fields.city.value.trim();

    if (value.length === 0) {
        setError(fields.city, "City is required.");
        return false;
    }

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

function validateProduct() {
    const value = fields.product.value;

    if (value === "") {
        setError(fields.product, "Please choose a product.");
        return false;
    }

    setSuccess(fields.product);
    return true;
}

fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.phone.addEventListener("input", validatePhone);
fields.street.addEventListener("input", validateStreet);
fields.postcode.addEventListener("input", validatePostcode);
fields.city.addEventListener("input", validateCity);
fields.product.addEventListener("change", validateProduct);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.classList.add("d-none");

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isStreetValid = validateStreet();
    const isPostcodeValid = validatePostcode();
    const isCityValid = validateCity();
    const isProductValid = validateProduct();

    const isFormValid =
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isStreetValid &&
        isPostcodeValid &&
        isCityValid &&
        isProductValid;

    if (isFormValid) {
        successMessage.classList.remove("d-none");
        form.reset();

        Object.values(fields).forEach((field) => {
            field.classList.remove("is-valid");
        });
    }
});