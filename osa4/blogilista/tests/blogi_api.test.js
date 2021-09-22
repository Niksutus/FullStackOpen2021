const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initalBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('right amount of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initalBlogs.length)
})

test('the field identifying the blogs is named id', async () => {
  const response = await api
    .get('/api/blogs/')
  
  for (let blog of response.body){
    expect(blog.id).toBeDefined()
  }
})

test('a blog with the right contents gets added to the database', async () => {

  const newBlog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test Url",
    likes: 20
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(blog => blog.title)

  expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length +1 )
  expect(titles).toContain(
    'Test Title'
  )
})

test('when likes has not been given value it is automatically set as zero', async () => {
  
  const newBlog = {
    title: "Title Name",
    author: "Author Name",
    url: "Url"
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[blogsAtEnd.length -1].likes).toBe(0)

})

test('if the new blog does not have the fields title and url return with status code 400 Bad Request', async () => {

  const newBlog = {
    author: "Test Author",
    likes: 20
  }

  const response =  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)

})

test('test that a specific blog gets deleted from the database', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initalBlogs.length -1 
  )

  const idArray = blogsAtEnd.map(blog => blog.id)

  expect(idArray).not.toContain(blogToDelete.id)
})

test('changing of a single blog', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const editedBlog = blogsAtStart[2]

  const changeLikesAmount = () => {
    editedBlog.likes = editedBlog.likes -1  
  }

  changeLikesAmount()

  await api
    .put(`/api/blogs/${editedBlog.id}`)
    .send(editedBlog)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[2].likes).toBe(editedBlog.likes)

})

afterAll(() => {
  mongoose.connection.close()
})