const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  //conso/e.log(authorCounts)

  const formattedCounts = _.map(authorCounts, (value, key) => {
    return {
      author: key,
      blogs: value
    }
  })
  //console.log(formattedCounts)

  const topAuthor = _.maxBy(formattedCounts, 'blogs')
  //console.log(topAuthor)
  return topAuthor
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(groupedByAuthor, (blogsArray, authorName) => {
    return {
      author: authorName,
      likes: totalLikes(blogsArray)
    }
  })
  const topAuthor = _.maxBy(authorLikes, 'likes')
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}