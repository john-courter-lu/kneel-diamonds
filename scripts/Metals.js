import { getMetals, setMetals } from "./database.js"

const metals = getMetals()

/*
    chapter 5 "change" event lisenter

    要点：
    --把列表内容/选项前加上radio input button （句法：<input type="radio">)

    --用户click这个radio input button时，会产生“change” event

    --event.target === radio input button，所以可以调用input里面写的attributes，如name，value；
        而且它们都会被browser自动转为string，无论用不用引号，因为它们是html语言

    --把不同的button 在input tag中用相同的name 可以监控一组button。
        句法：
        在radio input button中<input type='radio' name='metal'> ; 
        在event listener中if(event.target.name === 'metal')

    
*/

/*
    * chpter 6 最精彩的一章 Modifying State 分为3个阶段
    第一阶段：storing state 1/2 
        位置：database


    第二阶段：storing state 2/2 
        位置：database


    第三阶段：monitoring state  （教材中用setting state，我觉得会和setter functions混淆）
        位置：不同用户选项的section
        动作：用“change” events的eventlistener，监控change/用户点击了radio input button，
            这时触发setter functions
            
        最常见的错误：漏掉parseInt，这样value就是string
    
*/
document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            window.alert(`You chose metal ${event.target.value}`)
            setMetals(parseInt(event.target.value))
        }
    }
)

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    //方法一：用for of loop 
    for (const metal of metals) {
        html += `<li>
            <input type="radio" name=metal value=${metal.id} /> ${metal.metal}
        </li>`
    }
    /*
        input tag内部：即使没有在${metal.id}外围加引号，browser也会自动加上。
        在dev tool中可以看到，它还是变为了string
        即使去掉metal两边的引号，还是会被加上引号；
        可以理解为event.target的值往往被编译成了string
    */
    html += "</ul>"
    return html
}

