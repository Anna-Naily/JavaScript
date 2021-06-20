"use strict";
//Создание массива объектов продуктов
let productsArr = [];
//Создание объекта корзины
let basket = {};
let basketEl = document.querySelector(".basket");
let totalEl = document.querySelector(".total");
let spanTotalEl = document.querySelector(".spanTotal");
//Создание класса продуктов
class Products {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
//Поиск карточек продуктов и помещение их в массив.
//Перебирание карточек и выявление данных из них.
//Создание объекта продукта и добавление объекта в массив продуктов.
let productCards = document.querySelectorAll(".featuredItem");
productCards.forEach(function (productCard) {
  let productId = productCard.querySelector("button[data-id]").textContent;
  let productName = productCard.querySelector(".featuredName").textContent;
  let productPriceArr = productCard
    .querySelector(".featuredPrice")
    .textContent.split("$");
  let productPrice = Number(productPriceArr[1]).toFixed(2);
  let productObj = new Products(productId, productName, productPrice);
  productsArr.push(productObj);
});
//Функция-обработчик события при клике по кнпокам продуктов.
function addListener() {
  let buttons = document.querySelectorAll("button[data-id]");
  buttons.forEach(function (buttonEl) {
    buttonEl.addEventListener("click", addProduct);
  });
}
//Функция добавления продукта.
function addProduct(event) {
  let productId = event.currentTarget.getAttribute("data-id");
  addToBasket(productId);
}
//Функция добавления продукта в корзину.
function addToBasket(id) {
  let countEl = document.querySelector(".count-buy");
  countEl.textContent++;
  showCountBasket(countEl);
  countObjInBasket(id);
  renderBasket(id);
  recalculationTotalSum();
}
//Функция отображения индикатора количества продуктов в корзине.
function showCountBasket(count) {
  let countNumber = Number(count.textContent);
  if (countNumber > 0) {
    count.style.display = "block";
  }
}
//Функция добавления \ увеличения количества товара в корзине.
function countObjInBasket(id) {
  if (!(id in basket)) {
    basket[id] = 1;
  } else {
    basket[id]++;
  }
}
//Создание обработчика логотипу корзины и добавление класса 'hidden'.
let cartEl = document.querySelector(".cartIconWrap");
cartEl.addEventListener("click", function () {
  basketEl.classList.toggle("hidden");
});
//Функция рисует окно корзины.
function renderBasket(id) {
  let productCheck = document.querySelector(
    `.spanProductCount[data-id="${id}"]`
  );
  if (productCheck) {
    increaseCount(id);
    sumOfProducts(id);
  } else {
    renderProductInBasket(id);
  }
}
//Функция рисует товар в окне корзины.
function renderProductInBasket(id) {
  let productBox = `<div class="basketRow">
  <div class="productName">${productsArr[id].name}</div>
  <div class="productCount">
    <span class="spanProductCount" data-id="${id}">1</span> шт.
  </div>
  <div class="productPrice">$${productsArr[id].price}</div>
  <div class="totalPrice">
    $<span class="spanTotalPrice" data-id="${id}">${productsArr[id].price}</span>
  </div>
</div>`;
  totalEl.insertAdjacentHTML("beforebegin", productBox);
}
//Функция увеличивает количество товара.
function increaseCount(id) {
  let productCountEl = document.querySelector(
    `.spanProductCount[data-id="${id}"]`
  );
  productCountEl.textContent++;
}
//Функция подсчета итоговой стоимости товаров одного id.
function sumOfProducts(id) {
  let spanTotalPriceEl = document.querySelector(
    `.spanTotalPrice[data-id="${id}"]`
  );
  let totalPriceOfProduct = (basket[id] * productsArr[id].price).toFixed(2);
  spanTotalPriceEl.textContent = totalPriceOfProduct;
}
//Функция подсчета общей стоимости корзины.
function recalculationTotalSum() {
  let totalSum = 0;
  for (let id in basket) {
    totalSum += basket[id] * productsArr[id].price;
  }
  spanTotalEl.textContent = totalSum.toFixed(2);
}
addListener();
