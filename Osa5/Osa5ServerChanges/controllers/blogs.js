const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/:id', async (req, res, next) => {
    const resultBlog = await Blog.findById(req.params.id)
    if (resultBlog) {
        res.json(resultBlog.toJSON())
    } else {
        res.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.likes === undefined) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title === undefined ? false : body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (req, res, next) => {
    const body = req.body
    const token = req.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log("check blogToBeDeleted", req.params.id)
    const blogToBeDeleted = await Blog.findById(req.params.id)

    if (blogToBeDeleted.user.toString() === decodedToken.id || blogToBeDeleted.user === decodedToken.id) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'wrong user' })
    }

})


blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())

})


module.exports = blogsRouter