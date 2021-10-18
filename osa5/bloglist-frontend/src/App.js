import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'
import BlogFrom from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlogHandler = async (event) => {
    event.preventDefault()

    try{
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotification(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogFormVisible(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }

    catch(exception){
      console.log(exception)
    }
  }

  const closeBlogForm = () => {
    setBlogFormVisible(false)
  }


  const hideWhenVisible = { display: blogFormVisible? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible? '' : 'none' }

  if(user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Error errorMessage={errorMessage}/>
        <form onSubmit={loginHandler}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="password"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.name} is logged in <button onClick={logoutHandler}>logout</button></p>

      <div style={hideWhenVisible}>

        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogFrom
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange = {({ target }) => setUrl(target.value)}
          createBlogHandler = {createBlogHandler}
          closeBlogForm = {closeBlogForm}
        />
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
      }
    </div>
  )
}

export default App