fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return addProducts(data)
    })

function addProducts(data) {
    const id = data[0]._id
    const anchor = createAnchor(id)
    appendChildrens(anchor)
}

function createAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildrens(anchor) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
    }
}


// function createImg(imageUrl, altTxt) {
//     const image = document.createElement("img")
//     image.src = imageUrl
//     image.alt = altTxt
//     return image
// }