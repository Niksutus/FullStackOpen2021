import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])
 
  const loginHandler = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({ username, password, })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
    }
    
  }
  
  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if(user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
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
      <p>{user.name} is logged in <button onClick={logoutHandler}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App