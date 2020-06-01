const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: "Jorma",
        url: "www.google.fi",
        likes: 10
    },
    {
        title: 'Testi otsikko2',
        author: "Jorma",
        url: "www.google.fi",
        likes: 5
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}