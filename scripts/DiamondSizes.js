import { getSizes, setSizes } from "./database.js"

const sizes = getSizes()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSizes(Number(event.target.value))
        }
    }
)

export const DiamondSizes = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    //钻石 vs 金属 vs 款式 三者的list相同，但是生成html的syntax不同
    //法二 用.map（）和.join("") vs 法一 用for。。。of loop 每一个iteration用一次+=
    const listItems = sizes.map(size => {
        return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carets}
        </li>`
    })
    //这样listItems是从an array of objects变为了（map为了）an array of strings

    html += listItems.join("") //把an array of strings用空格（“”）连接为一个长string
    html += "</ul>"

    return html
}

