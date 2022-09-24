const queryString = window.location.search
console.log(queryString)
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))
    .catch(function (error) {
        alert(error);
    });

function handleData(item) {
    console.log(item)
    const {
        altTxt,
        colors,
        description,
        imageUrl,
        name,
        price,
        _id
    } = item
    // console.log(item)
    // const altTxt = item.altTxt
    // console.log(altTxt)
    // const colors = item.colors
    // const description = item.description
    // const imageUrl = item.imageUrl
    // console.log(imageUrl)
    // const name = item.name
    // console.log(name)
    // const price = item.price
    // const _id = item.id

    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
}

function createImage(imageUrl, altTxt) {
    const itemImg = document.querySelector(".item__img");

    // variable pour créer une image et intégré l'url et alt
    const image = document.createElement("img");
    itemImg.appendChild(image);
    image.src = imageUrl;
    image.alt = altTxt;
}

function createTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function createPrice(price) {
    const span = document.querySelector('#price')
    if (span != null) span.textContent = price
}

function createDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}