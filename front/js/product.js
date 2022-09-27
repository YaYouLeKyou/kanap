const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName

}

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => handleData(res))
    .catch(function (error) {
        alert(error);
    });

function handleData(item) {
    const {
        altTxt,
        colors,
        description,
        imageUrl,
        name,
        price
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
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
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

function createColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {

        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            select.appendChild(option)
            option.textContent = color
        });
    }
}

const button = document.querySelector("#addToCart");
if (button != null) {
    button.addEventListener("click", () => {
        const colors = document.querySelector("#colors").value;
        const quantity = document.querySelector("#quantity").value;

        if (colors == null || colors === "" || quantity == null || quantity == 0 || quantity >= 101) {
            alert("SVP choissez une couleur et une quantité max 100, merci.");
            return button;
        }

        const key = `${id}-${colors}`
        const data = {
            id: id,
            name: articleName,
            color: colors,
            quantity: Number(quantity),
            price: itemPrice,
            imageUrl: imgUrl,
            altText: altText
        }

        let addId = `${id}` + ":" + data;
        localStorage.setItem(key, JSON.stringify(data));

        //redirection vers le pannier
        window.location.href = "cart.html";
    });
}