const config = require('../utils/config')
const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    comment: {
        type: String
    },
    id: {
        type: String
    }
})

// commentsSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         // delete returnedObject._id
//         // delete returnedObject.__v
//     }
// })

module.exports = mongoose.model('Comments', commentsSchema)
