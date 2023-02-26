
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

//retrieve data from locals storage, if no local storage available just retrieve empty array
let basket = JSON.parse(localStorage.getItem('data')) || []

function generateShop() {
    return (shopEl.innerHTML = shopItemsData.map(object => {
        let {id, name, price, description, img} = object

        //search for ids in local storage, if they exist retrieve if not do nothing
        let search = basket.find(product => product.id === id) || []
        return `
            <div id="product-id-${id}" class="item">
                <img src='${img}'>
                <div class="details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <div class="price-quantity">
                        <h3>$ ${price}</h3>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">${search.item === undefined? 0: search.item}</div>
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

    //search func responsible for finding the product, if product not found it is pushed in the basket
    if(searchBasket === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    //if product is found only its quantity is increased
    } else {
        searchBasket.item ++
    }
    
    //save items added to basket in local storage
    localStorage.setItem('data', JSON.stringify(basket))


    //update func is run every time + btn clicked
    update(selectedItem.id)
}

let decrement = id => {
    let selectedItem = id
    let searchBasket = basket.find(product => product.id === selectedItem.id)

    //stop decreasing product quantity below 0, decrement func stops at 0
    if(searchBasket.item === 0) return
    else {
        searchBasket.item --
    }

    //save total items in basket in local storage
    localStorage.setItem('data', JSON.stringify(basket))
    //update func is run every time - btn clicked
    update(selectedItem.id)
}

let update = (id) => {
    let search = basket.find(product => product.id === id)
    
    //if id is found product quantity is changed (updated) inside div 
    document.getElementById(id).innerHTML = search.item
    //calculate cart total only when update func is triggered
    calculateCartTotal()
}

//runs when update() is triggered
let calculateCartTotal = () => {
    let cartIcon = document.getElementById('cartAmount')
    //add all item quantity with .map().reduce()
    cartIcon.innerHTML = basket.map(product => product.item).reduce((x,y) => x + y, 0)
}

calculateCartTotal()










