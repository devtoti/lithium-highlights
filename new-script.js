const results = [
    {
        chapter: 'capitulo1',
        annotation: 'primer contenido'
    },
    {
        chapter: 'capitulo2',
        annotation: 'segundo contenido'
    },
    {
        chapter: 'capitulo1',
        annotation: 'tercer contenido'
    },
]

const proc = results.reduce((acc, val) => {
    // console.log({ acc, val, k: acc[val.chapter] })
    return ({ ...acc, [val.chapter]: [...(acc[val.chapter] || []), val.annotation] })
}, {})



let data = {}
for (let elem in results) {
    // console.log(results[elem])
    const element = results[elem]
    data = {...data, [element.chapter]: [...(data[element.chapter] || []), element.annotation]}
    // console.log(element)
    console.log(data)
}

// console.log(proc)

