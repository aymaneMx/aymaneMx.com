const getFeaturedBlogs = async () => {
  try {
    const posts = await import(`@/static/featured_blogs.json`)
    return posts.default
  } catch (err) {
    // console.log(err)
    return []
  }
}

export { getFeaturedBlogs }
