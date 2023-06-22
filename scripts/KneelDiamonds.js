
import { Metals } from "./Metals.js"
import { DiamondSizes } from "./DiamondSizes.js"
import { JewelryStyles } from "./JewelryStyles.js"
import { Orders } from "./Orders.js"
import { addCustomOrder } from "./database.js"

/* Chapter 8 阶段3/3
第三阶段：在KneelDiamonds.js中为button增加click event listener,来invoke addCustomOrder
*/

document.addEventListener(
    "click",
    (event) => {
        if(event.target.id === "orderButton"){
            addCustomOrder()
        }
    }
)

/* Chapter 4 
    认识到KneelDiamonds.js = 总的动态HTML generator，
    与database相关的不同section的HTML generator functions在这里被import，
    再加上必要的html tags和classes。
    同时负责button的HTML以及相关的click events
*/
//我的idea：把这个module合并到main.js



export const KneelDiamonds = () => {
    return `
        <h1>Kneel Diamonds</h1>

        <article class="choices">
            <section class="choices__metals options">
                <h2>Metals</h2>
                ${Metals()}
            </section>
            <section class="choices__sizes options">
                <h2>Sizes</h2>
                ${DiamondSizes()}
            </section>
            <section class="choices__styles options">
                <h2>Styles</h2>
                ${JewelryStyles()}
            </section>
        </article>

        <article>
            <button id="orderButton">Create Custom Order</button>
        </article>

        <article class="customOrders">
            <h2>Custom Jewelry Orders</h2>
            ${Orders()}
        </article>
    `
}



