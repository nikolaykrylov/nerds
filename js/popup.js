var open = document.querySelector(".map .btn");
var popup = document.querySelector(".inquiry-form");
var close = document.querySelector(".inquiry-form-close");
var form = popup.querySelector("form");
var nameField = popup.querySelector("[name=inquiry-name]");
var email = popup.querySelector("[name=inquiry-email]");
var message = popup.querySelector("[name=inquiry-text]");
var storage = localStorage.getItem("name");

open.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("inquiry-form-show");
    if (storage) {
        nameField.value = storage;
        email.focus();
    } else if (storage) {
        (nameField.value = storage) && (email.value = storage);
        message.focus();
    }
        else {
        nameField.focus();
    }

});

close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("inquiry-form-show");
});

form.addEventListener("submit", function(event) {
    if(!nameField.value || !email.value || !message.value) {
        event.preventDefault();
        popup.classList.add("inquiry-form-error")
    } else {
        localStorage.setItem("name", nameField.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("inquiry-text", message.value);
    }
});

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        if (popup.classList.contains("inquiry-form-show")) {
            popup.classList.remove("inquiry-form-show");
            popup.classList.remove("inquiry-form-error");
        }
    }
});