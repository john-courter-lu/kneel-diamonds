import { getStyles, setStyles } from "./database.js"

const styles = getStyles()

/**
    chapter 4 各个section(3个固定section+1个实时生成section)的html generator functions
    首先是unordered list "<ul>"
    然后把array中每个obj用.map()来转换为listItems （<li></li>）
    再用.join()把array中每个li用空格连接【可试试join是否可以把list转换为一个不换行的段落？】
    最后收尾"</ul>"
    并return html

    注意在Orders.js中的.map()比较复杂，
    因为要先用.find()从order出发，找到相应的metal/size/style的obj，进而是price
    于是用单独function来做。
    同时那个function要设置一个parameter
    但是invoke时不需要指定，因为.map()默认给出了argument：array中的每个obj
 */

export const JewelryStyles = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    //用.map()来把数组里的object转换为html string
    const listItems = styles.map(style => {
        return `<li>
            <input type="radio" name="style" value="${style.id}" /> ${style.style}
        </li>`
    })


    // Join all of the strings in the array into a single string
    //把所有数组里的html string用空格来join
    html += listItems.join("")

    html += "</ul>"
    return html
}

document.addEventListener(
    "change",
    (event) => {
        if(event.target.name === 'style')
        {
            setStyles(Number(event.target.value))
        }
    }
)