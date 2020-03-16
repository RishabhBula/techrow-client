const client = require('contentful').createClient({
  space: "6u5tx5bx5r35",
  accessToken: "VfySsVoNol4Uhtj480qSbOfOyxpmKQzvXxiueS2ovTU"
})

const getBlogPosts = () => client.getEntries().then(response => response.items)

const getSinglePost = slug =>
  client
    .getEntries({
      'fields.slug': slug,
      content_type: 'blogPost'
    })
    .then(response => response.items)

export { getBlogPosts, getSinglePost }
