// @author Pranav
// Contentfull connection

const client = require('contentful').createClient({
  space: "6u5tx5bx5r35", // space
  accessToken: "VfySsVoNol4Uhtj480qSbOfOyxpmKQzvXxiueS2ovTU" // accessToken
})

// Get All Blog posts
const getBlogPosts = () => client.getEntries().then(response => response.items)

// Get Blog Post Detail from slug name
const getSinglePost = slug =>
  client
    .getEntries({
      'fields.slug': slug,
      content_type: 'blogPost'
    })
    .then(response => response.items)

export { getBlogPosts, getSinglePost }
