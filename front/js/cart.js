const cart = [];

takeItemFromCache() //a voir
console.log(cart)
cart.forEach((item) => displayItem(item))

function takeItemFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems - 1; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
        console.log(itemObject)
    }
}

function displayItem(item) {
    const article = createArticle(item)
    const imageDiv = createImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = createCartContent(item)
    article.appendChild(cardItemContent)

    displayArticle(article)
    displayTotalPrice(item)
    displayTotalQuantity(item)
}


function displayTotalPrice(item) {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(item => {
        const totalItemPrice = item.price * item.quantity
        total += totalItemPrice
        totalPrice.textContent = total
    })
}

function displayTotalQuantity(item) {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

function createCardItemContent(item) {
    const div = document.createElement("div")
    div.classList.classList.add("card__item__content")
}

function createCartContent(item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item_content")
    const description = createDescription(item)
    const settings = createSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent

}

function createDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2).style.textAlign = "center"
    description.appendChild(p).style.textAlign = "center"
    description.appendChild(p2).style.textAlign = "center"

    return description

}

function createSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("card__item__content__settings")
    addQuantityToSettings(settings, item)
    return settings
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("card__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté :"
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function deleteSettings() {
    const div = document.createElement("div")
    div.classList.add("cart__item__content_settings__delete")
    const p = document.createElement("p")
    p.textContent("Supprimer")
    div.appendChild(p)
    settings.appendChild(div)
}

function displayArticle(article) {
    document.querySelector('#cart__items').appendChild(article)
}

function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    // article.appendChild(createTitle(item))
    // article.appendChild(createPrice(item))
    // article.appendChild(createQuantity(item))
    // article.appendChild(createColor(item))
    // article.appendChild(createImage(item))
    return article
}

function createImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("card__item__img")
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    image.style.width = '50%'
    div.style.textAlign = 'center'
    div.appendChild(image)
    return div
}