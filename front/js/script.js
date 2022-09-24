fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return addProducts(data)
    }).catch(function (error) {
        alert(error);
    });

// altTxt: "Photo d'un canapé bleu, deux places"
// colors: (3) ['Blue', 'White', 'Black']
// description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// _id: "107fb5b75607497b96722bda5b504926"


function addProducts(data) {
    data.forEach(element => {
        console.log("element", element)

        const {
            _id,
            imageUrl,
            altTxt,
            name,
            description
        } = element
        //destructuring de:
        // const _id = data[0]._id
        // const imageUrl = data[0].imageUrl
        // const altTxt = data[0].altTxt
        // const name = data[0].name
        // const description = data[0].description
        const image = createImage(imageUrl, altTxt)

        const anchor = createAnchor(_id)

        const article = document.createElement("article")
        const h3 = createH3(name)
        const p = createParagraph(description)
        appendElementsToArticle(article, [image, h3, p])

        appendArticleToAnchor(anchor, article)
    })
}

function appendElementsToArticle(article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })
    // article.appendChild(image)
    // article.appendChild(h3)
    // article.appendChild(p)
}

function createAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?" + id
    return anchor
}

function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        items.appendChild(article)
    }
}

function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
}

function createH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add(".productName")
    return h3

}

function createParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}