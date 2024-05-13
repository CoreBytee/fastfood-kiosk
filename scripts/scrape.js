async function WaitForEvent(EventTarget, EventName) {
    return await new Promise(
        (Resolve) => {
            if (EventTarget.addEventListener) {
                function Listener(Event) {
                    EventTarget.removeEventListener(EventName, Listener)
                    Resolve(Event)
                }
                EventTarget.addEventListener(EventName, Listener)
            } else {
                function Listener(Event) {
                    EventTarget.off(EventName, Listener)
                    Resolve(Event)
                }
                EventTarget.on(EventName, Listener)
            }
        }
    )
}

async function Sleep(Time) {
    return await new Promise(
        (Resolve) => {
            setTimeout(Resolve, Time)
        }
    )
}

async function WaitForQuery(document, Query, MaxTime=Infinity) {
    let Elapsed = 0
    while (true) {
        const QueryResult = document.querySelectorAll(Query)
        console.log(QueryResult.length)
        if (QueryResult.length != 0) { return Array.from(QueryResult) }
        await Sleep(100)
        Elapsed += 100
        if (Elapsed >= MaxTime) { return null }
    }
}

const Data = {}

Data.Categories = Array.from(document.querySelectorAll("a")).filter(
    (Link) => {
        if (Link === undefined) { return false }
        if (Link.dataset.testid === undefined) { return false }
        return Link.dataset.testid.startsWith("menu-option-scroller-tile-")
    }
).map(
    (Link, Index) => {
        console.log(Link)
        return {
            Thumbnail: Link.querySelector("img").src.replace("?h=70", ""),
            Name: Link.querySelector("span").innerText,
            Id: Index,
            Link: Link.href
        }
    }
)

Data.MenuItems = []
for (const Category of Data.Categories) {
    const CategoryWindow = window.open(Category.Link, "_blank")

    await WaitForEvent(CategoryWindow, "load")
    const ProductElements = await WaitForQuery(CategoryWindow.document, 'div[data-testid="menu-tile-bk"')
    console.log(ProductElements)

    for (const ProductElement of ProductElements) {
        console.log(ProductElement.parentNode.href)
        const ProductWindow = window.open(ProductElement.parentNode.href, "_blank")
        console.log(ProductWindow)
        await WaitForEvent(ProductWindow, "load")
        let ProductDescription = await WaitForQuery(ProductWindow.document, '.renderer__StyledBlockContent-sc-1ws75a1-0.sFrJR p', 10000)

        if (!ProductDescription) {
            ProductDescription = [{innerText: "No description"}]
        }

        Data.MenuItems.push(
            {
                Thumbnail: ProductElement.querySelector("img").currentSrc,
                Name: ProductElement.querySelector("h2").innerText,
                Category: Category.Id,
                Link: ProductElement.parentNode.href,
                Description: ProductDescription[0].innerText
            }
        )
        ProductWindow.close()
    }

    // Data.MenuItems = [
    //     ...Data.MenuItems,
    //     ...MenuItems.map(
    //         async (Link) => {
    //             const ProductWindow = window.open(Link.parentNode.href, "_blank")
    //             await WaitForEvent(ProductWindow, "load")

    //             return {
    //                 Thumbnail: Link.querySelector("img").currentSrc,
    //                 Name: Link.querySelector("h2").innerText,
    //                 Category: Category.Id,
    //                 Link: Link.parentNode.href,
    //                 Description: ProductWindow.document.querySelectorAll(".renderer__StyledBlockContent-sc-1ws75a1-0.sFrJR p")[0].innerText
    //             }
    //         }
    //     )
    // ]

    CategoryWindow.close()
}

console.log(Data)