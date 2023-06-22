import { getMetals, getOrders, getSizes, getStyles } from "./database.js"


const buildOrderListItem = (order) => {
/*
    Chapter 9 寻找金属价格 在函数buildOrderListItem中增加下面的步骤
    第一步：用getter function得到所有metal的object array
    第二步：用.find()来找到那一个object（foundMetal/chosenMetal）符合：其id===order.metalId
        句法  theObjArray.find(
            (iterator) => {
                return iterator.id === order.metalId
            })
        这样返回符合条件的obj
        这完美取代了for of loop，直接得到符合条件的obj；
    第三步：读取返回obj之price  chosenMetal.price
    第四步：把price用toLocaleString()转换为human readble price，有美元标志，有两个小数点。
        句法 toLocaleString("en-US",{style:"currency", currency:"USD"})
    第五步：更新html string，显示price
        注意：第三-五步可以合并
*/

    const metals = getMetals()
    const chosenMetal = metals.find(metal => metal.id === order.metalId)
    //通过一小时的调试，发现order.metalId是string，而metal.id是number.问题在Metal.js中的click events

    const styles = getStyles()
    const chosenStyle = styles.find(style => style.id === order.styleId)

    const sizes = getSizes()
    const chosenSize = sizes.find(obj => obj.id === order.sizeId)

    const totalPrice = chosenMetal.price + chosenStyle.price + chosenSize.price
    //注意：在html tag中的text是不会有格式的。即使用tilda和string interpolation也不会
    
    return `<li>
        Order #${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString()},
        and it costs ${totalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })} 

    </li>`
}


export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    /*   
         试了一下，若不在这个函数里，Order#1是不受影响的，仍然可以正常显示；
         但是新生成的custom order则不能正常显示；
         所以，我们必须每次invoke这个函数时，来赋值最新的custom order给orders
         
     */
    const orders = getOrders()

    let html = "<ul>"

    //用.map()来把数组里的object转换为html string
    //同时注意，这里的buildOrderListItem没有传入argument，
    //可能是因为orders.map既是method又为这个函数传入了argument：orders这个array中的obj
    const listItems = orders.map(buildOrderListItem) //我会改名：mapDetailFunction

    //把所有数组里的html string用空格来join
    html += listItems.join("")
    html += "</ul>"

    return html
}

