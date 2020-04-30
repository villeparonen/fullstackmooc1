// const mongoose = require('mongoose')
// set +o histexpand
// https://unix.stackexchange.com/questions/3747/understanding-the-exclamation-mark-in-bash

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url =
//     `mongodb+srv://fullstack:${password}@cluster0-6dcqw.mongodb.net/people-app?retryWrites=true`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


// const personSchema = new mongoose.Schema({
//     name: String,
//     number: String,
//     id: Number,
// })
// const Person = mongoose.model('Person', personSchema)


// const person = new Person({
//     name: 'Matti Isoaho',
//     number: "0404 858585"
// })



// person.save().then(response => {
//     console.log('person saved!')
//     mongoose.connection.close()
// })

// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })
//     mongoose.connection.close()
// })

// // Note.find({ important: true }).then(result => {
// //     // ...
// //   })