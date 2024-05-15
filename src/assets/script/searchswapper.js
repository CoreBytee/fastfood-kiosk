const SearchButton = document.getElementById("searchbutton")

SearchButton.addEventListener(
    "click",
    () => {
        if (GetScreen() == "searchmenu") {
            SetScreen("products")
            SearchButton.childNodes[1].setAttribute("class", "bi bi-search")
        } else {
            SetScreen("searchmenu")
            SearchButton.childNodes[1].setAttribute("class", "bi bi-arrow-return-left")
        }
    }
)