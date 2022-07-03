const checkBtn = document.getElementById("check-btn");
const uploader = document.getElementById("file-upload");
const app = document.getElementById("app");
const textarea = document.getElementById("output");
const test = document.getElementById("tests");
const newBook = document.getElementById('selected-book')
const searchBar = document.querySelector('#searchBar')
const reader = new FileReader();
let data = "";
let highlightColors;
let bookTitle;
uploader.addEventListener("change", handleFile);

function handleFile(e) {
    const userFile = e.target.files[0];
    // console.log(userFile)
    placeFileContent(data, userFile);
}

function placeFileContent(target, file) {
    // console.log(target, file);
    readFile(file)
        .then((readData) => {
            data = `${readData}`;
            //run RegExps in order to determine annotations, highlights and colors
            const re_bookTitle = /(?<=\<h1\>).+(?=\<\/h1\>)/
            const re_highlight = /(?<=\<div class='highlight'\>).+(?=\<\/div\>)/
            const re_title = /(?<=\<div class='title'\>).+(?=\<\/div\>)/
            const re_color = /#[\w-\d]*(?=')/
            const regExpColor = new RegExp(re_color, 'gmi')
            const regExpTitle = new RegExp(re_title, 'gmi')
            const regExpHighlight = new RegExp(re_highlight, 'gmi')
            const regExpBookTitle = new RegExp(re_bookTitle, 'gmi')
            let colorResults = data.match(regExpColor)
            highlightColors = colorResults
            let titleResults = data.match(regExpTitle)
            let highlightResults = data.match(regExpHighlight)
            bookTitle = data.match(regExpBookTitle)
            console.log(bookTitle)
            classifyAnnotations(titleResults, highlightResults, colorResults, titleResults.length, bookTitle)

        })
        .catch((error) => console.error(error));
}

function readFile(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}



//read user file and create main data object containing arrays based on chapters
function classifyAnnotations(titles, highlights, colors, nums, bookTitle) {
    let results = []
    let data2 = {}
    for (i = 0; i < nums; i++) {
        results = [...results, {
            title: titles[i],
            highlight: highlights[i],
            color: colors[i]
        }]
    }

    for (let elem in results) {
        const element = results[elem]
        data2 = { ...data2, [element.title]: [...(data2[element.title] || []), { highlight: element.highlight, color: element.color }] }
    }

    displayBook(data2, bookTitle)
    // console.log(data2)
}


function displayBook(book, name) {
    let i = 1;
    // console.log(book)
    for (let chapter in book) {
        // console.log(chapter)
        const section = book[chapter]
        let newChapter = document.createElement('div')
        newChapter.className = `chapter${i}`
        i++
        let chapterTitle = document.createElement("h3")
        let titleContent = document.createTextNode(chapter)
        chapterTitle.appendChild(titleContent)
        newChapter.appendChild(chapterTitle)

        for (let annotation of section) {
            // console.log(annotation)
            let chapterHighlight = document.createElement("p")
            chapterHighlight.style.borderColor = annotation.color
            let titleContent = document.createTextNode(annotation.highlight)
            chapterHighlight.appendChild(titleContent)
            newChapter.appendChild(chapterHighlight)
        }
        // bookName.createTextNode(bookTitle)
        // newBook.appendChild(bookName)
        newBook.appendChild(newChapter)
    }
    let bookName = document.createElement('h1')
    let bookNameContent = document.createTextNode(name)
    bookName.appendChild(bookNameContent)
    newBook.prepend(bookName)
    getColors()
}

function getColors() {
    
    let colorSet = new Set(highlightColors)
    let colorPalette = document.createElement('div')
    colorPalette.classList.add('color-palette')

    colorSet.forEach(color => {
        console.log(color)
        let colorDiv = document.createElement('div')
        colorDiv.classList.add("highlight-color")
        colorDiv.style.backgroundColor = color
        colorPalette.appendChild(colorDiv)
        newBook.prepend(colorPalette)
        colorDiv.addEventListener('click', (e) => filterColors(e))
    }
    )
}


function filterColors(e) {
    console.log(e.target.style)
    const highlights = document.querySelectorAll('p')
    const circleColor = e.target.style.backgroundColor;
    chapters = document.querySelectorAll("[class*=chapter]")

    for (let p of highlights) {
        if (circleColor == p.style.borderColor) {
            // console.log(true)
            p.classList.remove('is-hidden')
        } else {
            // console.log(false)
            p.classList.add('is-hidden')
        }
        hideChapters(chapters)
        
    }

}
searchBar.addEventListener("input", searchAnnotations)

function searchAnnotations(e) {
    // console.log(e.target.value)
    chapters = document.querySelectorAll("[class*=chapter]")
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


function hideChapters(chapters) {
    chapters.forEach(chapter => {
        let chapterParagraphs = Array.from(chapter.childNodes)
        chapterParagraphs.shift()
        // console.log(chapter)
        let paragraphsHidden = chapterParagraphs.every(p => p.classList.value == 'is-hidden')
        if (paragraphsHidden) {
            chapter.style.display = "none"
        } else {
            chapter.style.display = "block"

        }
    }
    )
}






// let data = `<div class='annotation'>
// <div class='color' style='background-color: #f7ed7c'></div>
// <div class='title'>1. Un animal sin importancia</div>
// <div class='highlight'>Hace unos 70.000 a&#241;os, organismos pertenecientes a la especie Homo sapiens empezaron a formar estructuras todav&#237;a m&#225;s complejas llamadas culturas. El desarrollo subsiguiente de estas culturas humanas se llama historia.</div>
// </div>
// <div class='annotation'>
// <div class='color' style='background-color: #f77c7c'></div>
// <div class='title'>1. Un animal sin importancia</div>
// <div class='highlight'>Hubo humanos mucho antes de que hubiera historia</div>
// </div>
// <div class='annotation'>
// <div class='color' style='background-color: #f7ed7c'></div>
// <div class='title'>1. Un animal sin importancia</div>
// <div class='highlight'>Lo m&#225;s importante que hay que saber acerca de los humanos prehist&#243;ricos es que eran animales insignificantes que no ejerc&#237;an m&#225;s impacto sobre su ambient</div>`