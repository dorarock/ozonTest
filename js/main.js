"use strict";

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
        price: 20000,
        discount: 15,
        image: "img/8.jpg"
    },

    9: {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10300,
        discount: 10,
        image: "https://via.placeholder.com/150"
    },

    10: {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 10500,
        discount: 0,
        image: "https://via.placeholder.com/150"
    },

    11: {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 13000,
        discount: 5,
        image: "https://via.placeholder.com/150"
    },

    12: {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 20000,
        discount: 0,
        image: "https://via.placeholder.com/150"
    }
}

class Items {
    constructor(productCart) {
        this.productCart = productCart;
        this.itemsLength;
    }

    render(goods) {
        let suffix = '';
        let noDisc = `<p class="discount" style="display: none"></p>`;
        Object.keys(goods).length > 21 ? suffix = 'товар' : suffix = 'товаров';
        this.itemsLength = document.querySelector('.itemsLength');
        this.itemsLength.insertAdjacentHTML("beforeEnd", `${Object.keys(goods).length + ' ' + suffix}`);

        for (let id in goods) {
            let priceEnd = goods[id].price - (goods[id].price * (goods[id].discount / 100));

            this.productCart.container.insertAdjacentHTML("beforeEnd", `
            <div class="col-3 itemCard">
            <img class="productImg" src=${goods[id].image}>
            ${goods[id].discount == 0 ? `${noDisc}` : `<p class="discount"> -${goods[id].discount}%</p>`}
            <span class=${goods[id].discount == 0 ? "afterDiscount" : "afterDiscountColor"}>${priceEnd < 10000 ? priceEnd :
                    new Intl.NumberFormat('ru-RU').format(priceEnd)} ₽ ${goods[id].discount == 0 ? '' :
                        `<small class="beforeDiscount">${goods[id].price < 10000 ? goods[id].price :
                            new Intl.NumberFormat('ru-RU').format(goods[id].price)} ₽</small>`}</span>
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
    constructor(processed) {
        this.processed = processed;
        this.cart = {};
        this.checkbox;
        this.checkboxFirst;
        this.main_items_header;
        this.cartIcon
        this.cart_wrapper;
        this.label;
        this.container = document.querySelector('.row');;
    }

    addToCart(productId) {
        this.cart[productId] = this.cart[productId] == null ? 1 : this.cart[productId] + 1;
        console.log(this.cart);
    }

    _setCallbacks() {
        this.cartIcon = document.querySelector('.cartIcon');
        let isCatrOpened = false;
        this.cartIcon.addEventListener('click', () => {
            if (isCatrOpened == false) {
                this._renderCart(goods);
                isCatrOpened = true;
            }

        });
    }

    _renderCart(goods) {
        this.cart_wrapper = document.querySelector('.cart_wrapper');
        this.main_items_header = document.querySelector('.main_items_header');
        let item_wrapper = document.querySelector('.item_wrapper');
        let order_txt = document.querySelector('.order_txt');
        let order_sum = document.querySelector('.order_sum');
        let order_disc_sum = document.querySelector('.order_disc_sum');
        let total_cost = document.querySelector('.total_cost');

        if (Object.keys(this.cart).length == 0) {
            container.remove();
            this.cart_wrapper.style.display = 'block';
            this.cart_wrapper.innerHTML = `<span class="emptyCart">Зайдите в <a href="index.html" class="Link">каталог</a> и выберете товар</span>`;
        }

        container.remove();
        item_wrapper.innerHTML = '';

        let suffix = '';
        this.cart_wrapper.style.display = 'block';
        Object.keys(this.cart).length < 21 ? suffix = 'товарa' : suffix = 'товар';
        this.main_items_header.innerHTML = `Корзина <small class="itemsLength">${Object.keys(this.cart).length + ' ' + suffix}</small>`;

        let productCount = 0;
        let productCost = [];
        let productDiscount = [];
        for (let key in this.cart) {
            productCount = productCount + this.cart[key];
        }

        for (let key in this.cart) {
            item_wrapper.insertAdjacentHTML("beforeEnd", `
                        <div class="item">
                            <input type="checkbox" class="checkbox" id="checkbox" data-id = ${key}>
                            <img src="${goods[key].image}" width="43" height="67">
                            <span class="cart_product_name">${goods[key].name}</span>
                            <small class="product_price">${goods[key].price * this.cart[key]} ₽ <small class="product_count">${this.cart[key]} шт</small></small>
                        </div>
            `);
            productCost.push(this.cart[key] * goods[key].price);
            productDiscount.push(goods[key].price * (goods[key].discount / 100) * this.cart[key]);
        }
        let totalCost = productCost.reduce((total, amount) => total + amount);
        let totalDiscounCost = productDiscount.reduce((total, amount) => total + amount);
        let finalCost = totalCost - totalDiscounCost;
        console.log(totalDiscounCost);

        order_txt.innerHTML = `${productCount} ${suffix} на сумму`;
        order_sum.innerHTML = `${totalCost < 10000 ? totalCost : new Intl.NumberFormat('ru-RU').format(totalCost)} ₽`;
        order_disc_sum.innerHTML = ` -${totalDiscounCost < 10000 ? totalDiscounCost : new Intl.NumberFormat('ru-RU').format(totalDiscounCost)} ₽`;
        total_cost.innerHTML = `${finalCost < 10000 ? finalCost : Intl.NumberFormat('ru-RU').format(finalCost)} ₽`;

        this._setRemoveCallBack();
        this._setSelectAllCallback();
    }

    _setRemoveCallBack() {
        this.label = document.querySelector('.label');
        this.label.addEventListener('click', () => {
            this._removeFromCart();
        })
    }

    _setSelectAllCallback() {
        this.checkbox = document.querySelectorAll('.checkbox');
        this.checkboxFirst = document.getElementById('checkboxFirst');
        this.checkboxFirst.addEventListener('click', () => {
            for(let i = 0; i < this.checkbox.length; i++){
                this.checkbox[i].checked =  this.checkboxFirst.checked;
            }
        })
    }

    _removeFromCart() {
        for(let i = 0; i < this.checkbox.length; i++) {
            if(this.checkbox[i].checked == true) {
                delete(this.cart[this.checkbox[i].dataset.id]);
            }
        }
         this._renderCart(goods);
    }

}


let productCart = new ProductCart();
let items = new Items(productCart);
items.render(goods);
