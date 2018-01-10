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

var mapImage = document.querySelector(".map img");
var mapLogo = document.querySelector(".map-logo");

window.onload = (function() {
    mapImage.classList.add("element-hidden");
    mapLogo.classList.add("element-hidden");
});


ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.938631, 30.323055],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Нердс',
            balloonContent: 'Нердс'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-marker.png',
            // Размеры метки.
            iconImageSize: [231, 190],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-55, -210]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});

