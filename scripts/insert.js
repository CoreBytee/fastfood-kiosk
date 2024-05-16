import mysql from "mysql2/promise";
import fs from "fs";
import data from "../data/burgerking.json";

const connection = await mysql.createConnection(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
    }
)

async function fetchThumbnail(thumbnailUrl, slug) {
    const thumbnailPath = `./images/${slug}.png`
    if (fs.existsSync(thumbnailPath)) { return thumbnailPath }

    if (thumbnailUrl.startsWith("data:image")) {
        const base64Data = thumbnailUrl.replace(/^data:image\/png;base64,/, "");
        fs.writeFileSync(thumbnailPath, base64Data, "base64");
    } else {
        const fileResponse = await fetch(thumbnailUrl);
        const fileData = await fileResponse.blob();
        fs.writeFileSync(thumbnailPath, fileData);
    }

    return thumbnailPath
}

await connection.execute("TRUNCATE TABLE categories")

for (const category of data.Categories) {
    category.Thumbnail = await fetchThumbnail(category.Thumbnail, `category_${category.Id + 1}`)

    await connection.execute(
        "INSERT INTO categories (id, name, thumbnail) VALUES (?, ?, ?)",
        [category.Id + 1, category.Name, category.Thumbnail]
    )
}

await connection.execute("TRUNCATE TABLE products")

let productId = 1
for (const product of data.MenuItems) {
    console.log(product)
    product.Thumbnail = await fetchThumbnail(product.Thumbnail, `product_${productId}`)
    await connection.execute(
        "INSERT INTO products (id, name, description, thumbnail, price, category) VALUES (?, ?, ?, ?, ?, ?)",
        [productId, product.Name, product.Description, product.Thumbnail, 10, product.Category + 1]
    )

    productId++
}

connection.destroy()