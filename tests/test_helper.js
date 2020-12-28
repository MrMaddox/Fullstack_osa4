const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Musan Blogi',
    author: 'Musa',
    url: 'www.musa.com',
    likes: 1,
    user: "5fe9cd99d0bd43b00d6687b7"
  },
  {
    title: 'Jonkun Blogi',
    author: 'Joku',
    url: 'www.joku.com',
    likes: 5,
    user: "5fe9cd99d0bd43b00d6687b7"
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'moi', author: 'moikkuli', url: 'www.moi.moi', likes: 1 })
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
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}