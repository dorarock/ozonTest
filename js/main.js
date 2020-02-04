"use strict";

let container = document.querySelector('.row');
let itemsLength = document.querySelector('.itemsLength');
let cartIcon = document.querySelector('.cartIcon');

let goods = [
    {
        id: 1,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/1.jpg",
        isInCart: false
    },

    {
        id: 2,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10000,
        discount: 30,
        image: "img/2.jpg",
        isInCart: false
    },

    {
        id: 3,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/3.jpg",
        isInCart: false
    },

    {
        id: 4,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/4.jpg",
        isInCart: false
    },

    {
        id: 5,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 1000000,
        discount: 15,
        image: "img/5.jpg",
        isInCart: false
    },

    {
        id: 6,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/6.jpg",
        isInCart: false
    },

    {
        id: 7,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 9999,
        discount: 0,
        image: "img/7.jpg",
        isInCart: false
    },

    {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10000,
        discount: 15,
        image: "img/8.jpg",
        isInCart: false
    }
]

class Items {
    constructor(productCart) {
        this.productCart = productCart;
    }

    render(goods) {
        let b = '';
        let noDisc = `<p class="discount" style="display: none"></p>`;

        goods.length > 21 ? b = 'товар' : b = 'товаров';
        itemsLength.insertAdjacentHTML("beforeEnd", `${goods.length + ' ' + b}`);


        goods.forEach(item => {
            let priceEnd = item.price - (item.price * (item.discount / 100));


            container.insertAdjacentHTML("beforeEnd", `
            <div class="col-3 itemCard">
            <img class="productImg" src=${item.image}>
            ${item.discount == 0 ? `${noDisc}` : `<p class="discount"> -${item.discount}%</p>`}
            <span class="afterDiscount">${priceEnd < 10000 ? priceEnd : new Intl.NumberFormat('ru-RU').format(priceEnd)} ₽ ${item.discount == 0 ? '' : `<small class="beforeDiscount">${item.price < 10000 ? item.price : new Intl.NumberFormat('ru-RU').format(item.price)} ₽</small>`}</span>
            <span class="product_name">${item.name}</span>
            <button class="buyBtn" data-id=${item.id}>В корзину</button>
        </div>
            `);

        })

        this._setCallbacks();
        this.productCart._setCallbacks();
    }

    _setCallbacks() {
        let buyBtn = document.querySelectorAll('.buyBtn');
        let productNum = document.querySelector('.productNum');
        console.log(buyBtn, productNum);
        let count = 1;

        for (let i = 0; i < buyBtn.length; i++) {
            buyBtn[i].addEventListener('click', () => {
                console.log(`${buyBtn[i].dataset.id}`);
                productNum.innerHTML = count;
                count++;
                buyBtn[i].classList.add('buyBtnAcvtive');
                buyBtn[i].innerHTML = 'В корзине';
                this.productCart.addToCart(buyBtn[i].dataset.id);
            })
        }

    }

}


class ProductCart {
    constructor() {
        this.cart = [];
    }

    addToCart(productId) {
        this.cart = [...this.cart, productId]
        console.log(this.cart);
    }

    _setCallbacks() {

        cartIcon.addEventListener('click', () => {
            this._renderCart();
        })
    }

    _renderCart() {
        

    }




}

let productCart = new ProductCart();

let items = new Items(productCart);
items.render(goods);