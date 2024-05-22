const categories = await fetch("/api/categories").then(response => response.json())
const products = await fetch("/api/products").then(response => response.json())

const searchInput = document.querySelector("#searchinput")
const searchResults = document.querySelector("#searchresults")

const categoryHolder = document.querySelector("#products #categories")
const productHolder = document.querySelector("#products #products")
const receiptHolder = document.querySelector("#receiptholder")
const totalPriceElement = document.querySelector("#totalprice")

const selectedProducts = {}
const receiptElements = {}

function updateQuantities(product) {
    Array.from(
        document.querySelectorAll(`#product-quantity-${product.id}`)
    ).forEach(
        element => {
            element.innerText = selectedProducts[product.id] || 0
        }
    )
}

function updateTotalPrice() {
    let totalPrice = 0
    for (const product of products) {
        if (selectedProducts[product.id]) {
            totalPrice += product.price * selectedProducts[product.id]
        }
    }
    totalPriceElement.innerText = `$${totalPrice}`
}

function removeProduct(product, actionButtonHolder) {
    selectedProducts[product.id]--
    if (selectedProducts[product.id] <= 0) {
        delete selectedProducts[product.id]
        receiptHolder.removeChild(receiptElements[product.id])
        delete receiptElements[product.id]
    }
    updateQuantities(product)
    updateTotalPrice()
}

function addProduct(product, actionButtonHolder) {
    if (!selectedProducts[product.id]) { selectedProducts[product.id] = 0 }
    selectedProducts[product.id]++
    if (!receiptElements[product.id]) {
        const receiptElement = document.createElement("div")
        receiptElement.classList.add("product")
        receiptHolder.appendChild(receiptElement)

        const priceRow = document.createElement("div")
        priceRow.classList.add("pricerow")
        receiptElement.appendChild(priceRow)

        const name = document.createElement("p")
        name.innerText = product.name
        priceRow.appendChild(name)

        const price = document.createElement("p")
        price.innerText = `$${product.price}`
        priceRow.appendChild(price)

        renderActionButtons(product, receiptElement)
        receiptElements[product.id] = receiptElement
    }

    updateQuantities(product)
    updateTotalPrice()
}

function renderActionButtons(product, parentElement) {
    const actionButtons = document.createElement("div")
    actionButtons.classList.add("productactions")
    parentElement.appendChild(actionButtons)

    const removeButton = document.createElement("button")
    removeButton.innerText = "-"
    removeButton.classList.add("remove")
    removeButton.addEventListener("click", () => { removeProduct(product, actionButtons) })
    actionButtons.appendChild(removeButton)

    const quantity = document.createElement("p")
    quantity.setAttribute("id", `product-quantity-${product.id}`)
    quantity.innerText = 0
    quantity.classList.add("quantity")
    actionButtons.appendChild(quantity)

    const addButton = document.createElement("button")
    addButton.innerText = "+"
    addButton.classList.add("add")
    addButton.addEventListener("click", () => { addProduct(product, actionButtons) })
    actionButtons.appendChild(addButton)
}

function renderProduct(product, parentElement) {
    const productElement = document.createElement("button")
    productElement.classList.add("product")

    const productImage = document.createElement("img")
    productImage.src = `/api/thumbnail/?type=product&id=${product.id}`
    productElement.appendChild(productImage)

    const productName = document.createElement("h6")
    productName.innerText = product.name
    productElement.appendChild(productName)

    const productPrice = document.createElement("p")
    productPrice.innerText = `$${product.price}`
    productElement.appendChild(productPrice)

    renderActionButtons(product, productElement)

    parentElement.appendChild(productElement)
}

let first = true
for (const category of categories) {
    const categoryElement = document.createElement("button")
    categoryElement.classList.add("category")

    const categoryImage = document.createElement("img")
    categoryImage.src = `/api/thumbnail/?type=category&id=${category.id}`
    categoryElement.appendChild(categoryImage)

    const categoryName = document.createElement("p")
    categoryName.innerText = category.name
    categoryElement.appendChild(categoryName)

    categoryHolder.appendChild(categoryElement)

    categoryElement.addEventListener(
        "click",
        () => {
            productHolder.innerHTML = ""
            categoryHolder.querySelector(".selected")?.classList.remove("selected")
            categoryElement.classList.add("selected")

            for (const product of products) {
                if (product.category !== category.id) { continue }
                renderProduct(product, productHolder)
            }
        }
    )

    if (first) {
        first = false
        categoryElement.click()
    }
}

searchInput.addEventListener(
    "input",
    () => {
        searchResults.innerHTML = ""
        for (const product of products) {
            if (!product.name.toLowerCase().includes(searchInput.value.toLowerCase())) { continue }
            renderProduct(product, searchResults)
        }
    }
)