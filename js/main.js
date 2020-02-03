let container = document.querySelector('.row');
let itemsLength = document.querySelector('.itemsLength');
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
        price: 7132,
        discount: 0,
        image: "img/7.jpg",
        isInCart: false
    },

    {
        id: 8,
        name: "Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...",
        price: 7132,
        discount: 0,
        image: "img/8.jpg",
        isInCart: false
    }
]

class Items {
    constructor() {
        // this.name = goods.name;
        // this.price = goods.price;
        // this.discount = goods.discount;
        // this.image = goods.image;
        // this.isInCart = goods.isInCart
    }

    _render(goods) {
        console.log(goods);

        let b = '';
         let noDisc = `<div class="discount" style="display: none"></div>`;
        goods.length > 21 ? b = 'товар' : b = 'товаров';

        itemsLength.insertAdjacentHTML("beforeEnd", `${goods.length + ' ' + b}`);

        goods.forEach(item => {
            let priceEnd = item.price - (item.price * (item.discount / 100));
            item.discount !== 0 ? noDisc = `<div class="discount">- ${item.discount} %</div>` : noDisc;

            container.insertAdjacentHTML("beforeEnd", `
            <div class="col-3 itemCard">
            <img src=${item.image}>
            ${noDisc}
            <span class="afterDiscount">${priceEnd} ₽  <small class="beforeDiscount">${item.price} ₽</small></span>
            <span class="product_name">${item.name}</span>
            <button class="buyBtn">В корзину</button>
        </div>
            `);
        })

    }
}

let items = new Items();
items._render(goods);
