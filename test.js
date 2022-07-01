let data = `<div class='annotation'>
<div class='color' style='background-color: #f7ed7c'></div>
<div class='title'>1. Un animal sin importancia</div>
<div class='highlight'>Hace unos 70.000 a&#241;os, organismos pertenecientes a la especie Homo sapiens empezaron a formar estructuras todav&#237;a m&#225;s complejas llamadas culturas. El desarrollo subsiguiente de estas culturas humanas se llama historia.</div>
</div>
<div class='annotation'>
<div class='color' style='background-color: #f77c7c'></div>
<div class='title'>1. Un animal sin importancia</div>
<div class='highlight'>Hubo humanos mucho antes de que hubiera historia</div>
</div>
<div class='annotation'>
<div class='color' style='background-color: #f7ed7c'></div>
<div class='title'>1. Un animal sin importancia</div>
<div class='highlight'>Lo m&#225;s importante que hay que saber acerca de los humanos prehist&#243;ricos es que eran animales insignificantes que no ejerc&#237;an m&#225;s impacto sobre su ambient</div>`

const re_highlight = /(?<=\<div class='highlight'\>).+(?=\<\/div\>)/
const re_title = /(?<=\<div class='title'\>).+(?=\<\/div\>)/
const re_color = /#[\w-\d]*(?=')/
const regExpColor = new RegExp(re_color, 'gmi')
const regExpTitle = new RegExp(re_title, 'gmi')
const regExpHighlight = new RegExp(re_highlight, 'gmi')
let colorResults = data.match(regExpColor)
let titleResults = data.match(regExpTitle)
let highlightResults = data.match(regExpHighlight)


// console.log(colorResults)
// console.log(titleResults)
// console.log(highlightResults)

function classifyAnnotations(titles, highlights, colors, nums) {
    let results = []
    for (i=0; i < nums; i++) {
        results = [...results, {
            title: titles[i],
            highlight: highlights[i],
            color: colors[i]
        }]
    }
    // let results2 = results.reduce((acc, val) => [...acc, color:'something'], {})
    let results2 = results.reduce((acc, val) => [...acc, [val.title]: [{color: val.color}]], [])
    
        // { ...acc, [element.title]: [...(acc[element.title] || []), { annotation: element.highlight, color: element.color }] }
    console.log(results)
    console.log(results2)
}

classifyAnnotations(titleResults, highlightResults, colorResults, titleResults.length)