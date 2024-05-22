const Keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', "backspace"],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'space'],
]

const Keyboards = Array.from(
    document.querySelectorAll(".keyboard")
)

Keyboards.forEach(
    (Keyboard) => {
        const Input = document.getElementById(Keyboard.getAttribute("inputid"))
        Keys.forEach(
            (Row) => {
                const RowElement = document.createElement("div")
                RowElement.classList.add("row")
                Keyboard.appendChild(RowElement)
                Row.forEach(
                    (Key) => {
                        const KeyElement = document.createElement("button")
                        KeyElement.classList.add("key")
                        if (Key == "backspace") {
                            Key = "⌫"
                        }
                        KeyElement.textContent = Key
                        RowElement.appendChild(KeyElement)

                        KeyElement.addEventListener(
                            "click",
                            () => {
                                if (Key == "⌫") {
                                    Input.value = Input.value.slice(0, -1)
                                } else if (Key == "space") {
                                    Input.value += " "
                                } else {
                                    Input.value += Key
                                }

                                Input.dispatchEvent(
                                    new Event("input")
                                )
                            }
                        )
                    }
                )
            }
        )
    }
)