

// let arr = [{}, {}]

// let arr2 = { "name": "ville" }
// let arr3 = arr.concat(arr2)

// console.log(arr3)


// let testi = [{ name: "ville" }]

// testi.forEach(i => {
//     console.log(i.name === "ville")
// })

// let t = testi.every(u => {
//     u.name === "ville"
// })

// console.log(t)

let test = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

let test2 = test.filter(i => {
    console.log(i.name)
    return i.name.includes("la")
})
console.log(test2)

console.log("sdjfjsdf".includes("sdf"))