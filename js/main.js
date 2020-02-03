let container = document.querySelector('.row');
let itemsLength = document.querySelector('.itemsLength');
let goods = [
    {
        name: "Стул",
        price: 7132,
        discount: 0,
        image: "img/",
        isInCart: false
    },

    {
        name: "Стул",
        price: 1000000,
        discount: 30,
        image: "img/",
        isInCart: false
    },

    {
        name: "Стул",
        price: 7132,
        discount: 0,
        image: "img/",
        isInCart: false
    },

    {
        name: "Стул",
        price: 7132,
        discount: 0,
        image: "img/",
        isInCart: false
    },

    {
        name: "Стул",
        price: 1000000,
        discount: 15,
        image: "img/",
        isInCart: false
    },

    {
        name: "Стул",
        price: 7132,
        discount: 0,
        image: "img/",
        isInCart: false
    },
    
     {
        name: "Стул",
        price: 7132,
        discount: 0,
        image: "img/",
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
        goods.length > 21 ? b = 'товар' : b = 'товаров';

        itemsLength.insertAdjacentHTML("beforeEnd",`${goods.length + ' ' + b}`);

        goods.forEach(item => {
            let priceEnd =  item.price - ( item.price * ( item.discount / 100))
            container.insertAdjacentHTML("beforeEnd", `
            <div class="col itemCard">
                        <img src="img/Bitmap@2x.jpg" width="200" height="200">
                        <div class="discount">-30%</div>
                        <span class="afterDiscount">7 321 ₽ <small class="beforeDiscount">1 000 000 ₽</small></span>
                        <span class="product_name">Стул Lars желтый пластик Ш.48 В.83 Г.56 Вес 5.5кг...</span>
                        <button class="buyBtn">В корзину</button>
                    </div>
            `);
        })

        
    }
}

let items = new Items();
items._render(goods);