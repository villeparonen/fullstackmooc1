const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let loggedInToken = '';

beforeAll(async () => {

    await Blog.deleteMany({})
    // await Blog.insertMany(helper.initialBlogs)

    const testUsername = "testikäyttäjä1"
    const testName = "testikäyttäjä1"
    const testPassword = "salainensana"

    const loggingResult = await api
        .post('/api/users')
        .send({ username: testUsername, name: testName, password: testPassword })

    const testToken = await api
        .post('/api/login')
        .send({ username: testUsername, password: testPassword })

    loggedInToken = testToken.body.token

    const createBlogs1 = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(helper.initialBlogs[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const createBlogs2 = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(helper.initialBlogs[1])
        .expect(200)
        .expect('Content-Type', /application\/json/)

})


test('blogs returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// 4.8. Testaa, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja.
test('test GET all blogs to return correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// 4.9. Tee testi, joka varmistaa että palautettujen blogien identifioivan kentän tulee olla nimeltään id
test('id field is defined for all blog posts', async () => {
    const response = await api.get('/api/blogs')
    const idfield = response.body.map(r => r.id)
    idfield.forEach(i => expect(i).toBeDefined())
})

test('SPECIFIC RESULT IS WITHIN THE RETURNED BLOGS', async () => {
    const response = await api.get('/api/blogs')

    // expect(response.body[1].author).toBe('Jorma')

    const author = response.body.map(r => r.author)

    expect(author).toContainEqual(
        'Jorma'
    )
})

// 4.10. Testaa että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs. Testaa että blogien määrä kasvaa yhdellä.
test('Test POST be able to add new blogposts to /api/blogs and length will increase by 1', async () => {
    const newBlog = {
        title: 'TestiOtsikko',
        author: "Jorma",
        url: "www.testurl.fi"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContainEqual(
        'TestiOtsikko'
    )
})

// 4.22. Tee myös testi, joka varmistaa että uuden blogin lisäys ei onnistu, ja pyyntö palauttaa oikean statuskoodin 401 Unauthorized jos pyynnön mukana ei ole tokenia
test('Post blog fails without token', async () => {
    const newBlog = {
        title: 'TestiOtsikko2',
        author: "Jorma2",
        url: "www.testu2rl.fi"
    }

    await api
        .post('/api/blogs')
        //.set('Authorization', `bearer ${loggedInToken}`) missing leads to failure and 401
        .send(newBlog)
        .expect(401)
})

// 4.11. Testaa että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0
test('Test POST to return likes 0 if likes is not given', async () => {
    const newBlog = {
        title: 'TestSubjectOf9238589r4tffeljrfk4',
        author: "TestUserUnique90285092348",
        url: "www.testurl.fi"
        //likes: Not set. Test if it is not set, it will return 0.
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.filter(b => {
        return b.author === newBlog.author && b.title === newBlog.title
    })
    expect(contents[0].likes).toBe(0)
})


// 4.12. Testaa että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad request
test('Test POST to return 400 if request body not contain title and url', async () => {
    const newBlog = {
        author: "TestUser",
        likes: 1000
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedInToken}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})


test('API _GET_ID_ BLOG', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // expect(resultBlog.body).toEqual(blogToView)
})


test('API _DELETE_ BLOG', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${loggedInToken}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    // expect(blogsAtEnd).toHaveLength(
    //     helper.initialBlogs.length - 1
    // )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContainEqual(blogToDelete.title)
})

describe('Usertests. when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .set('Authorization', `bearer ${loggedInToken}`)
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })



    // 4.16. Tee myös testit, jotka varmistavat, että virheellisiä käyttäjiä ei luoda, ja että virheellisen käyttäjän luomisoperaatioon vastaus on järkevä statuskoodin ja virheilmoituksen osalta.
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .set('Authorization', `bearer ${loggedInToken}`)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username has to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('creation fails with proper statuscode and message if password is under 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'xcvxcvxcvcvbad',
            name: 'asdasdafsdgert',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .set('Authorization', `bearer ${loggedInToken}`)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Too short password')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('creation fails with proper statuscode and message if username is under 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'xc',
            name: 'asdasdafsdgert',
            password: 'salasanasdfw4',
        }

        const result = await api
            .post('/api/users')
            .set('Authorization', `bearer ${loggedInToken}`)
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Too short password or username')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


})

afterAll(() => {
    mongoose.connection.close()
})