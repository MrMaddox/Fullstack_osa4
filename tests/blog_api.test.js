const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the first blog is about  Musan Blogi', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('Musan Blogi')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(contents).toContain(
      'Musan Blogi'
    )
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Uusi blogi',
      author: 'Uusi',
      url: 'www.uuu.com',
      likes: 5,
      user: "5fe9cd99d0bd43b00d6687b7"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    //const titles = response.body.map(r => r.titles)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    //expect(titles).toContain('Uusi blogi')
  })

  test('Add blog and set likes to default ', async () => {
    const newBlog = {
      title: 'Uusi blogi2',
      author: 'Uusi2',
      url: 'www.uuu.com',
      user: "5fe9cd99d0bd43b00d6687b7"
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    //const response = await api.get('/api/blogs')
  
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[blogsAtStart.length-1]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body.likes).toEqual(0)

  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'www.uuu.com',
        likes: 2,
        user: "5fe9cd99d0bd43b00d6687b7"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  
    const response = await api.get('/api/blogs')
  

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  
    const contents = blogsAtEnd.map(r => r.title)
  
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate= blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({likes: 2})
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).not.toEqual(1)
  })

afterAll(() => {
  mongoose.connection.close()
})