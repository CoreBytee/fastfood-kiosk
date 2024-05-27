const products = await fetch("/api/products").then(response => response.json())
const thumbnailScrollerElement = document.getElementById("thumbnailscroller")

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

document.getElementById("startorderbutton").addEventListener(
    "click",
    () => {
        SetScreen("products")
    }
)

for (const product of products) {
    const productImage = document.createElement("img")
    productImage.src = `/api/thumbnail/?type=product&id=${product.id}`
    productImage.alt = product.name
    productImage.setAttribute("id", `${product.id}-thumbnailscroller`)
    thumbnailScrollerElement.appendChild(productImage)
}

while (true) {
    for (const product of products) {
        thumbnailScrollerElement.querySelector(".shown")?.classList.remove("shown")
        const element = document.getElementById(`${product.id}-thumbnailscroller`)
        element.classList.add("shown")
        await sleep(5000)
    }
}