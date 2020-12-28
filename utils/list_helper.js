const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
      let sum = 0

      for (let i = 0; i < blogs.length; i++) {
          sum = sum + blogs[i].likes
        }

        return sum;
  }

  const favoriteBlog = (blogs) => {
    if (blogs.length < 1) return null

    let most_amount = 0
    let most_id = 0

    for (let i = 0; i < blogs.length; i++) {
        if(blogs[i].likes > most_amount) {
            most_amount = blogs[i].likes
            most_id = i
        }
    }
    return blogs[most_id]
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }