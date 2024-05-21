const categories = await fetch("/api/categories").then(response => response.json())
const products = await fetch("/api/products").then(response => response.json())

const categoryHolder = document.querySelector("#products #categories")
const productHolder = document.querySelector("#products #products")

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

            for (const product of products) {
                if (product.category !== category.id) { continue }

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

                productHolder.appendChild(productElement)
            }
        }
    )

    if (first) {
        first = false
        categoryElement.click()
    }
}