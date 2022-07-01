const newBook = document.getElementsByClassName('bookjs')
const annotations = document.querySelectorAll('.annotation');
const searchBar = document.querySelector('#searchBar')
const searchValue = searchBar.value
let newAnnotations = Array.from(annotations)
// newAnnotations = newAnnotations.splice(0, 100)
let results = []
let chapters;

// async function getChapters() {
//     chapters = await document.querySelectorAll("[class*=chapter]")
// }

newAnnotations = newAnnotations.map((elem, id) => {
    const [color, title, highlight] = elem.children

    let newAnnotation = {
        color: color.style.backgroundColor,
        title: title.innerText,
        highlight: highlight.outerText,
        id: id
    }
    results = [...results, newAnnotation]//?



})
let data = {}
for (let elem in results) {
    const element = results[elem]
    data = { ...data, [element.title]: [...(data[element.title] || []), { annotation: element.highlight, color: element.color }] }
}

let i = 1;

for (let title in data) {
    const array = data[title]
    // console.log(title)
    let newChapter = document.createElement('div')
    newChapter.className = `chapter${i}`
    i++
    let chapterTitle = document.createElement("h3")
    let titleContent = document.createTextNode(title)
    chapterTitle.appendChild(titleContent)
    newChapter.appendChild(chapterTitle)

    for (let element of array) {
        let chapterHighlight = document.createElement("p")
        chapterHighlight.style.color = element.color
        let titleContent = document.createTextNode(element.annotation)
        chapterHighlight.appendChild(titleContent)
        newChapter.appendChild(chapterHighlight)
    }

    console.log(newChapter.children.length)
    newBook[0].appendChild(newChapter)
}

// console.log(searchBar)
searchBar.addEventListener("input", searchAnnotations)

function searchAnnotations(e) {
    console.log(e.target.value)
    const highlights = document.querySelectorAll('p')

    for (i = 0; i < highlights.length; i++) {
        if (highlights[i].textContent.toLowerCase()
            .includes(searchBar.value.toLowerCase())) {
            highlights[i].classList.remove("is-hidden")
        } else {
            highlights[i].classList.add("is-hidden")
        }
    }
    hideChapters(chapters)
}



function getColors() {
    const colors = []
    let colorSet;
    let colorPalette = document.createElement('div')
    colorPalette.classList.add('color-palette')
    for (let elem of results) {
        colors.push(elem.color)
        colorSet = new Set(colors)
    }
    colorSet.forEach(value => {
        // console.log(value)
        let colorDiv = document.createElement('div')
        colorDiv.classList.add("highlight-color")
        colorDiv.style.backgroundColor = value
        colorPalette.appendChild(colorDiv)
        newBook[0].prepend(colorPalette)
        colorDiv.addEventListener('click', (e) => filterColors(e))
    }
    )
}

function filterColors(e) {
    const highlights = document.querySelectorAll('p')
    const circleColor = e.target.style.backgroundColor;

    for (let p of highlights) {
        if (circleColor == p.style.color) {
            // console.log(true)
            p.classList.remove('is-hidden')
        } else {
            // console.log(false)
            p.classList.add('is-hidden')
        }
        hideChapters(chapters)
        
    }

}


chapters = document.querySelectorAll("[class*=chapter]")

function hideChapters(chapters) {

    chapters.forEach(chapter => {
        let chapterParagraphs = Array.from(chapter.childNodes)
        chapterParagraphs.shift()
        console.log(chapter)
        let paragraphsHidden = chapterParagraphs.every(p => p.classList.value == 'is-hidden')
        if (paragraphsHidden) {
            chapter.style.display = "none"
        } else {
            chapter.style.display = "block"

        }
    }
    )
}




getColors()
