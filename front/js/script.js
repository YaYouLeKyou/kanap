//acceder a l' api ou retourner une erreur

fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return addProducts(data)
    }).catch(function (error) {
        alert(error);
    });


//pour chaque produit, faire apparaitre l' élément dans un article

function appendElementsToArticle(article, array) {
    array.forEach((item) => {
        article.appendChild(item)
    })

}

//créer un anchor pour englober chaque article

function createAnchor(id) {
    const aHref = document.createElement("a");
    aHref.href = "./product.html?id=" + id;
    return aHref
}

//faire apparaitre l' article dans chaque anchor

function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

//pour chaque produit créer une image

function createImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
}

//pour chaque produit créer un titre

function createH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add(".productName")
    return h3

}

//pour chaque produit créer un paragraphe de déscription

function createParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}

//faire apparaitre tous les produits de l' api avec leurs images, texts alt, titres, description
function addProducts(Kanaps) {
    Kanaps.forEach(kanap => {
        console.log("element", kanap)

        const {
            _id,
            imageUrl,
            altTxt,
            name,
            description
        } = kanap

        const image = createImage(imageUrl, altTxt)

        const anchor = createAnchor(_id)

        const article = document.createElement("article")
        const h3 = createH3(name)
        const p = createParagraph(description)
        appendElementsToArticle(article, [image, h3, p])

        appendArticleToAnchor(anchor, article)
    })
}