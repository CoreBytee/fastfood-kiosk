const ScreenHolder = document.querySelector(".screens")
const ScreenElements = Array.from(ScreenHolder.querySelectorAll("& > div"))

window.SetScreen = function(ScreenId) {
    ScreenElements.forEach(
        (ScreenElement) => {
            if (ScreenElement.id === ScreenId) {
                ScreenElement.classList.remove("hidden")

                if (ScreenElement.hasAttribute("fullscreen")) {
                    document.body.classList.add("fullscreen")
                } else {
                    document.body.classList.remove("fullscreen")
                }
            } else {
                ScreenElement.classList.add("hidden")
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

ScreenElements.forEach(
    (ScreenElement) => {
        if (!ScreenElement.hasAttribute("default")) { return }
        SetScreen(ScreenElement.id)
    }
)
