const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.title === undefined && body.url === undefined){
    return response.status(400).json({error: 'content missing'})

  } else {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
  
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }
})

module.exports = blogsRouter