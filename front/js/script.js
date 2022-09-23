fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(data) {
    //console.log(data)
    const imageUrl = data[0].imageUrl

    const anchor = document.createElement("a")
    anchor.text = "mes kanap"
    const items = document.querySelector("items")
    if (items != null) {
        items.appendChild(anchor)

    }
}