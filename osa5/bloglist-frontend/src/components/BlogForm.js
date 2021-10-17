import React from 'react'

const BlogForm = ({
    createBlogHandler,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    closeBlogForm,
    title,
    author,
    url
  }) => {
    return(
      <div>
        <h2>create new</h2>

          <form onSubmit={createBlogHandler}>
            <div>
              title
              <input 
                type="text"
                value={title}
                name="title"
                onChange={handleTitleChange}
              />
            </div>
            <div>
              author
              <input 
                type="text"
                value={author}
                name="author"
                onChange={handleAuthorChange}
              />
            </div>
            <div>
              url
              <input
                type="text"
                value={url}
                name="url"
                onChange={handleUrlChange}
              />
            </div>

            <button type="submit">create</button>
          </form>
          <button onClick={closeBlogForm}>cancel</button>
      </div>

    )
  }

export default BlogForm