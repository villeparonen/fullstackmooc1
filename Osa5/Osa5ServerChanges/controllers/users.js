const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, likes: 1 })
    // Populaten parametri määrittelee, että user-dokumenttien notes-kentässä olevat note-olioihin viittaavat id:t korvataan niitä vastaavilla dokumenteilla.
    response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response) => {
    const body = request.body

    // 4.16. käyttäjätunnuksen sekä salasanan tulee olla olemassa ja vähintään 3 merkkiä pitkiä
    if (body.password.length < 3 || body.username.length < 3) {
        return response.status(400).json({ error: "Too short password or username. Password and username should be atleast 3 characters." })
    }
    // 4.16. Käyttäjätunnuksen on oltava järjestelmässä uniikki.
    const users = await User.find({})
    console.log(users)
    const match = users.filter(u => {
        return u.username === body.username
    })
    console.log(match)
    if (match.length >= 1) {
        return response.status(400).json({ error: "This username is already in use. Username has to be unique." })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter