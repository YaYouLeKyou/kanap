const orderID = getOrderId()
displayOrderId(orderID)
emptyCache()

//récupération de l' order id

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}

//affichage de l' order id

function displayOrderId(orderID) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderID
}

//vide la cache

function emptyCache() {
    const cache = window.localStorage
    cache.clear()
}