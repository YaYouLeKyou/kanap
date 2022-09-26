const cart = [];

takeItemFromCache()
console.log(cart)
cart.forEach((item) => displayItem(item))

function takeItemFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems - 1; i++) { //voir avec Romuald pq randid dans localStorage
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
        console.log(itemObject)
    }
}

function displayItem(item) {
    const article = createArticle(item)
    displayArticle(article)
    console.log(article)
    const div = createImageDiv(item)
    article.appendChild(div)
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