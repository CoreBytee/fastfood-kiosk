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

    async function WaitForQuery(document, Query) {
        while (true) {
            const QueryResult = document.querySelectorAll(Query)
            console.log(QueryResult.length)
            if (QueryResult.length != 0) { return Array.from(QueryResult) }
            await Sleep(100)
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
        const MenuItems = await WaitForQuery(CategoryWindow.document, 'div[data-testid="menu-tile-bk"')
        console.log(MenuItems)

        Data.MenuItems = [
            ...Data.MenuItems,
            ...MenuItems.map(
                (Link) => {
                    return {
                        Thumbnail: Link.querySelector("img").currentSrc,
                        Name: Link.querySelector("h2").innerText,
                        Category: Category.Id,
                        Link: Link.parentNode.href
                    }
                }
            )
        ]

        CategoryWindow.close()
    }

    console.log(Data)