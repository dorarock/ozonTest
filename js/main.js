"use strict";

let container = document.querySelector('.row');
let main_items_header = document.querySelector('.main_items_header');
let itemsLength = document.querySelector('.itemsLength');
let cartIcon = document.querySelector('.cartIcon');
let cart_wrapper = document.querySelector('.cart_wrapper');

let goods = {
    1: {
        id: 1,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/1.jpg"
    },

    2: {
        id: 2,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10000,
        discount: 30,
        image: "img/2.jpg"
    },

    3: {
        id: 3,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/3.jpg"
    },

    4: {
        id: 4,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/4.jpg"
    },

    5: {
        id: 5,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 1000000,
        discount: 15,
        image: "img/5.jpg"
    },

    6: {
        id: 6,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/6.jpg"
    },

    7: {
        id: 7,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 9999,
        discount: 0,
        image: "img/7.jpg"
    },

    8: {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10000,
        discount: 15,
        image: "img/8.jpg"
    }
}

class Items {
    constructor(productCart) {
        this.productCart = productCart;
    }

    render(goods) {
        let b = '';
        let noDisc = `<p class="discount" style="display: none"></p>`;
        Object.keys(goods).length > 21 ? b = 'товар' : b = 'товаров';
        itemsLength.insertAdjacentHTML("beforeEnd", `${Object.keys(goods).length + ' ' + b}`);

        for (let id in goods) {
            let priceEnd = goods[id].price - (goods[id].price * (goods[id].discount / 100));
            container.insertAdjacentHTML("beforeEnd", `
            <div class="col-3 itemCard">
            <img class="productImg" src=${goods[id].image}>
            ${goods[id].discount == 0 ? `${noDisc}` : `<p class="discount"> -${goods[id].discount}%</p>`}
            <span class="afterDiscount">${priceEnd < 10000 ? priceEnd : new Intl.NumberFormat('ru-RU').format(priceEnd)} ₽ ${goods[id].discount == 0 ? '' : `<small class="beforeDiscount">${goods[id].price < 10000 ? goods[id].price : new Intl.NumberFormat('ru-RU').format(goods[id].price)} ₽</small>`}</span>
            <span class="product_name">${goods[id].name}</span>
            <button class="buyBtn" data-id=${id}>В корзину</button>
        </div>
            `);
        }

        this._setCallbacks();
        this.productCart._setCallbacks();
    }

    _setCallbacks() {
        let buyBtn = document.querySelectorAll('.buyBtn');
        let productNum = document.querySelector('.productNum');
        console.log(buyBtn, productNum);

        for (let i = 0; i < buyBtn.length; i++) {
            buyBtn[i].addEventListener('click', () => {
                console.log(`${buyBtn[i].dataset.id}`);
                buyBtn[i].classList.add('buyBtnAcvtive');
                buyBtn[i].innerHTML = 'В корзине';
                this.productCart.addToCart(buyBtn[i].dataset.id);
                productNum.innerHTML = Object.keys(this.productCart.cart).length;
            })
        }

    }

}


class ProductCart {
    constructor() {
        this.cart = {};
    }

    addToCart(productId) {
        this.cart[productId] = this.cart[productId] == null ? 1 : this.cart[productId] + 1;
        console.log(this.cart);
    }

    _setCallbacks() {
        cartIcon.addEventListener('click', () => {
            this._renderCart(goods);
        })
    }

    _renderCart(goods) {
        container.remove();
        let cart_wrapper = document.querySelector('.cart_wrapper');
        let item_wrapper = document.querySelector('.item_wrapper');
        let order_txt = document.querySelector('.order_txt');
        let order_sum = document.querySelector('.order_sum');
        let order_disc_sum = document.querySelector('.order_disc_sum');
        let total_cost = document.querySelector('.total_cost');

        let suffix = '';
        cart_wrapper.style.display = 'block';
        Object.keys(this.cart).length < 21 ? suffix = 'товарa' : suffix = 'товар';
        main_items_header.innerHTML = `Корзина <small class="itemsLength">${Object.keys(this.cart).length + ' ' + suffix}</small>`;

        let productCount = 0;
        let productCost = [];
        let productDiscount = [];
        for (let key in this.cart) {
            productCount = productCount + this.cart[key];
        }

        for (let key in this.cart) {
            item_wrapper.insertAdjacentHTML("beforeEnd", `
                        <div class="item">
                            <input type="checkbox" class="checkbox" id="checkbox">
                            <img src="${goods[key].image}" width="43" height="67">
                            <span class="cart_product_name">${goods[key].name}</span>
                            <small class="product_price">${goods[key].price * this.cart[key]} ₽</small>
                        </div>
            `);
            productCost.push(this.cart[key] * goods[key].price);
            productDiscount.push(goods[key].price * (goods[key].discount / 100) * this.cart[key]);
        }
        let totalCost = productCost.reduce((total, amount) => total + amount);
        let totalDiscounCost = productDiscount.reduce((total, amount) => total + amount);
        console.log(totalDiscounCost);

        order_txt.innerHTML = `${productCount} товара на сумму`;
        order_sum.innerHTML = `${totalCost} ₽`;
        order_disc_sum.innerHTML = ` -${totalDiscounCost} ₽`;
        total_cost.innerHTML = `${totalCost - totalDiscounCost} ₽`;
    }
}

let productCart = new ProductCart();
let items = new Items(productCart);
items.render(goods);
