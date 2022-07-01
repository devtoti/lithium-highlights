

let abc = document.getElementsByClassName("book-title")
let colors = document.querySelectorAll(".color")
let titles = document.querySelectorAll(".title")
let newDiv = document.createElement("div")
const newContent = document.createTextNode('this is my new div')
const currentDiv = document.getElementById("div1");
let annotations = document.querySelectorAll(".annotation")
let highlight = document.getElementsByClassName("highlight")


let annotations2 = Array.from(annotations)
let orderedArray = []
let newArray = []

annotations2 = annotations2.splice(0, 6)
console.table(annotations2, ["outerText"])
console.log(annotations2)

annotations2.sort(compareElements)


function compareElements(a, b) {
    
    const {children: textA, classNameA} = a
    const {children: textB, classNameB} = b
    const [colorA, titleA, highlightA] = textA
    const [colorB, titleB, highlightB] = textB
    const {textContent: txtA} = titleA
    const {textContent: txtB} = titleB
    const {textContent: hlB} = highlightB
    const {textContent: hlA} = highlightA
    

    // console.log(textA)
    console.log(txtA, "|", txtB)
    console.log(newArray)

    if (txtA === txtB) {
        console.log("yes")
        // console.log(hlA, hlB)
        const sameChapter = [b, a]
        if (hlA === hlB) {
            newArray.splice(-2,1)
        }
        newArray = [...newArray.concat(sameChapter).sort()]
    } else {
        console.log("no")
        const newChapter = [a]
        newArray = [...newArray.concat([newChapter])]
    }
    // console.log(title)
    // console.log(a, b)
    // if (a.children[1].innerText == b.children[1].innerText) {
    //     if (a === b)  {
    //        newArray = [...orderedArray, a]
    //     }
    //     newArray = [...orderedArray, b, a] 
        
    // } else {
       
    // }
    //  console.log(newArray)
}




// console.log(highlight[0].textContent)
// console.log(annotations2[0].children)
// console.log(annotations2[0].attributes)
// console.log(annotations2[0].childNodes)
// console.log(abc[0].textContent)
let arrayColors = Array.from(colors)
let test = Array.from(titles)



function createText(a, b) {
    let newHeading = document.createElement("h3")
    newHeading.setAttribute("id", `book-chapter-${b}`)
    newHeading.textContent = a
    currentDiv.appendChild(newHeading)

}


{/* <div class='annotation'>
    <div class='color' style='background-color: #f7ed7c'></div>
    <div class='title'>La l&#237;nea temporal de la historia</div>
<div class='highlight'>Asentamientos permanentes.</div>
</div> */}

function getText(arr) {
    let list = []
    arr.map((elem, id) => {
        list.push(elem.textContent)
        newList = [...new Set(list)]
    })
    newList.forEach(createText)
}
getText(test)
