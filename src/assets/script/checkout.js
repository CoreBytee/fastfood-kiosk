const checkoutButton = document.getElementById("checkoutbutton")
const orderIdElement = document.getElementById("orderid")

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

checkoutButton.addEventListener(
    "click",
    async () => {
        SetScreen("checkout")
        orderIdElement.textContent = Math.floor(Math.random() * 1000000)
        await sleep(15_000)
        window.location.reload()
    }
)