require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.get('/api/info', (req, res) => {
    const time = new Date()
    Person.find({}).then(people => {
        return people.length
    }).then(items => {
        res.send(`<h3>Phonebook has info for ${items} people</h3><p>${time}</p>`)
    })
})

// Mongoose!
app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(p => p.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(p => {
        if (p) {
            res.json(p.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }
    // Oletusarvoisesti tapahtumankäsittelijä saa parametrikseen updatedNote päivitetyn olion ennen muutosta olleen tilan. Lisäsimme operaatioon parametrin { new: true }, jotta saamme muuttuneen olion palautetuksi kutsujalle.
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(
            res.status(204).end()
        )
        .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.number || !body.name || body === undefined) {
        return res.status(400).json({
            error: 'Name or number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    }).catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
