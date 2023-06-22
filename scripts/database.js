/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/

/*

    Chapter 1. 构建database
    只要把我们的日常信息如Classic对应500，写进obj中，再加上id即可

*/
const database = {
    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carets: 0.5, price: 405 },
        { id: 2, carets: 0.75, price: 782 },
        { id: 3, carets: 1, price: 1470 },
        { id: 4, carets: 1.5, price: 1997 },
        { id: 5, carets: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    customOrders: [ 
        //chapter 3 ERD中需要这个bridge entity来连接其他三个entities。同时store settled states/user choices
        //我的个人意见是直接用orders来命名更好
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            timestamp: 1614659931693
        }
    ],
    orderBuilder: {}
    /*
     * chpter 6 最精彩的一章 Modifying State 分为3个阶段

        第一阶段：storing state 1/2 
            创建 obj for storing state（意思是user choice）

        这里新建了一个property：orderBuilder，我的意见是userChoice
        这里的特别之处是：其他property都是array，这个是单个obj，
        因为只保存用户的一组选择（包括metal，style，size三者的id），
        本身不需要id，因为是暂时的。
        在后面会把它给到新变量newOrder，那时候会加上合适的id，然后保存到order数组里；
     */
}

export const getMetals = () => {
    return database.metals.map(metal => ({ ...metal }))
}
export const getSizes = () => {
    return database.sizes.map(size => ({ ...size }))
}
export const getStyles = () => {
    return database.styles.map(style => ({ ...style }))
}
export const getOrders = () => {
    return database.customOrders.map(customOrder => ({ ...customOrder }))
}

/*
    * chpter 6 最精彩的一章 Modifying State 分为3个阶段
    第一阶段：storing state 1/2 
        位置：database
        动作：创建 obj for storing state（意思是user choice）

    第二阶段：storing state 2/2 
        位置：database
        动作：创建setter functions
        目标：把用户选择（id）转化为database中userChoice这个obj中的properties：xxxId

    第三阶段：monitoring state  （教材中用setting state，我觉得会和setter functions混淆）
        位置：不同用户选项的section
        动作：用“change” events的eventlistener，监控change/用户点击了radio input button，
            这时触发setter functions
*/

export const setMetals = (id) => {
    database.orderBuilder.metalId = id;
}

export const setSizes = (id) => {
    database.orderBuilder.sizeId = id;
}

export const setStyles = (id) => {
    database.orderBuilder.styleId = id;
}

/* Chapter 8 阶段1/3
第一阶段：
    当页面上“create new order”这个button被点击时，我们希望发生什么，写出这个callback function：
     ecaf addCustomOrder
     做三件事：
        --在database.js中把userChoice存储进去（永久改变state）,要加入id和timestamp；
        --重置userChoice；
        --document.dispatchEvent(new CustomEvent("stateChanged"))

第一步：复制当下的orderBuilder/userChoice/用户的选择 到新变量newOrder
    这里用到{...} spread syntax
第二步：增加一个property：pk（id）到newOrder这个object
    这里要在原来的customOrders中最后一个object的id基础上+1
第三步:增加第二个property：timestamp 到newOrder
    句法：= Date.now()，直接把当下时间以timestamp的格式保存。
第四步：把newOrder这个只包含一个最新订单的object加到/push到customOrders或orders这个array中
第五步：重置orderBuilder/userChoice这个零时收集user choices数据的object为空object
第六步：dispatchEvent（），好像是invoke a function，但这里是“invoke”an event
    这里会涉及custom event，句法是new CustomEvent('stateChanged')
    new好像是说：const CustomEvent = 'stateChanged'，定义了一个新CustomEvent，同时又给了它名字

*/

/* Chapter 8 阶段2/3
第二阶段：在main.js中增加click event
        这个新的event被dispatch时，就像user手动click或mouseMove等等动作。
        那我们要用event listener来监听这个event，并且告诉browser，当这个event被dispatch时，我想要做什么
        这就需要一个callback function：parameter是event或e，没有return而是做两个动作：
            1. console.log("State of data has changed. Regenerating HTML...")
            2.重新render所有html，通过invoke这个function： renderAllHTML()

*/

/* Chapter 8 阶段3/3 个人觉得阶段1和3是一体的
第三阶段：在KneelDiamonds.js中为button增加click event listener来invoke函数 addCustomOrder
*/

export const addCustomOrder = () => {
    const newOrder = {...database.orderBuilder}
    newOrder.id = 1 + database.customOrders[database.customOrders.length - 1].id
    newOrder.timestamp = Date.now()

    database.customOrders.push(newOrder)
    database.orderBuilder = {}

    document.dispatchEvent(new CustomEvent('stateChanged'))
}