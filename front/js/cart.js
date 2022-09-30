const cart = [];

takeItemFromCache() //a voir
console.log(cart)
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

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
    deleteSettings(settings, item)
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
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache()
}

function saveNewDataToCache() {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(item.id, dataToSave)
}

function deleteSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteFromCache(item)
    deleteArticleFromPage(item)
}

function deleteFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}

function displayArticle(article) {
    document.querySelector('#cart__items').appendChild(article)
}

function createArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
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

function submitForm(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("veuillez choisir un article")
        return
    }

    if (formIsInvalid()) return
    if (emailIsInvalid()) return

    const requestBody = createRequestBody()
    const form = document.querySelector(".cart__order__form")
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
        .then((data) => console.log(data))
    console.log(form.elements.firstName.value)
}

function createRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const requestBody = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()

    }
    console.log("requestBody:" + requestBody)
    return requestBody


}

function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts - 1; i++) {
        const key = localStorage.key(i)
        console.log(key)
        const id = key.split("-")[0]
        ids.push(id)
        console.log("ids:" + ids)

    }
    return ids
}

function formIsInvalid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Veuillez remplir tous les champs svp")
            return true
        }
        return false
    })
}

function emailIsInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (regex.test(email) === false) {
        alert("Veuillez rentrer un email valide")
        return true
    }
    return false
}