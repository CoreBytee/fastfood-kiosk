const ScreenHolder = document.querySelector(".screens")
const ScreenElements = Array.from(ScreenHolder.querySelectorAll("& > div"))

ScreenElements.forEach(
    (ScreenElement) => {
        if (ScreenElement.hasAttribute("default")) { return }
        ScreenElement.classList.add("hidden")
    }
)

window.SetScreen = function(ScreenId) {
    ScreenElements.forEach(
        (ScreenElement) => {
            if (ScreenElement.id === ScreenId) {
                ScreenElement.classList.remove("hidden")
            } else {
                ScreenElement.classList.add("hidden")

                if (ScreenElement.hasAttribute("fullscreen")) {
                    document.body.classList.add("fullscreen")
                } else {
                    document.body.classList.remove("fullscreen")
                }
            }
        }
    )
}

window.GetScreen = function() {
    return ScreenElements.find(
        (ScreenElement) => {
            return !ScreenElement.classList.contains("hidden")
        }
    ).id
}