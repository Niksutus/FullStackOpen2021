const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {

  if (blogs.length === 0){
    return {
      title: "",
      author: "",
      likes: "" 
    }
  } else {
    
    const likesArray = blogs.map((blog) => blog.likes)
    const indexOfHighestLikes = likesArray.indexOf(Math.max(...likesArray))
   
    const hihghestLikedBlog = blogs[indexOfHighestLikes]
  
    return  {
      title: hihghestLikedBlog.title,
      author: hihghestLikedBlog.author,
      likes: hihghestLikedBlog.likes
    }
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}