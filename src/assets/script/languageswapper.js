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

document.querySelectorAll(".language").forEach(
    (Language) => {
        Language.addEventListener(
            "click",
            () => {
                SetScreen("products")
            }
        )
    }
)