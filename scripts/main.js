import { KneelDiamonds } from "./KneelDiamonds.js"

const mainContainer = document.querySelector("#container")

const renderAllHTML = () => { //我会把名字改为renderMainContainerHTML
    mainContainer.innerHTML = KneelDiamonds() //想试试：把第三行去掉，直接合并到第六行会怎么样
}

renderAllHTML()

/* Chapter 8 阶段2/3
第二阶段：在main.js中增加click event
        这个新的event被dispatch时，就像user手动click或mouseMove等等动作。
        那我们要用event listener来监听这个event，并且告诉browser，当这个event被dispatch时，我想要做什么
        这就需要一个callback function：parameter是event或e，没有return而是做两个动作：
            1. console.log("State of data has changed. Regenerating HTML...")
            2.重新render所有html，通过invoke这个function： renderAllHTML()

*/

document.addEventListener('stateChanged', e => {
    console.log('State of data has changed. Regenerating HTML...')
    renderAllHTML()
})

//想试试：如果去掉e，改为()会怎样，至少用dev tools时可能会看不出event的相关参数？