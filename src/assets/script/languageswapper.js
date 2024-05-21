const LanguageButton = document.getElementById("languagebutton")

LanguageButton.addEventListener(
    "click",
    () => {
        if (GetScreen() == "languageselector") {
            SetScreen("products")
        } else {
            SetScreen("languageselector")
        }
    }
)