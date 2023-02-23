
let shopEl = document.getElementById('shop')

let shopItemsData = [{
    id: 'abc',
    name: 'French Connection',
    price: 199,
    description: 'Slim fit gray suit',
    img: 'image1.jpg'
}, 
{
    id: 'def',
    name: 'Moss',
    price: 325,
    description: 'Casual dark charcoal suit',
    img: 'image2.jpg'
}, 
{
    id: 'ghi',
    name: 'Moss',
    price: 342,
    description: 'Slim fit light navy suit',
    img: 'image3.jpg'
    
}, 
{
    id: 'klm',
    name: 'Slim fit Sharkskin Suit',
    price: 436,
    description: 'Slim fit dark navy suit',
    img: 'image4.jpg'

}];

let basket = []

function generateShop() {
    return (shopEl.innerHTML = shopItemsData.map(object => {
        let {id, name, price, description, img} = object
        return `
            <div class="item">
                <img src='${img}'>
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h3>$ ${price}</h3>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">0</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div> 
        `
    }).join(''))
}

generateShop()

let increment = id => {
    let selectedItem = id
    let searchBasket = basket.find(product => product.id === selectedItem.id)

    if(searchBasket === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        searchBasket.item ++
    }
    
    update(selectedItem.id)
}

let decrement = id => {
    let selectedItem = id
    let searchBasket = basket.find(product => product.id === selectedItem.id)

    if(searchBasket.item === 0) return
    else {
        searchBasket.item --
    }

    update(selectedItem.id)
}

let update = (id) => {
    let search = basket.find(product => product.id === id)
    
    document.getElementById(id).innerHTML = search.item
    calculateCartTotal()
}

//runs when update() is triggered
let calculateCartTotal = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map(product => product.item).reduce((x,y) => x + y, 0)
    

}











