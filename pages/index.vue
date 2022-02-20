<template>
  <div class="wrapper-small md:px-10">
    <div class="h-96 mt-5">
      <Hero/>
    </div>

    <Blogs :posts="posts" title="Featured Blogs" :critical="true"/>
    <Projects :projects="projects"/>
    <Contact title="Get In touch"/>
  </div>
</template>

<script>

import {getFeaturedBlogs} from "assets/js/flatFileDb"

export default {
  async asyncData({$axios}) {
    const projects = await $axios
      .get(
        'https://api.github.com/search/repositories?q=user:aymanemx&sort=stars&per_page=3'
      )
      .catch((errors) => {
        // console.log(errors)
      })

    const posts = await getFeaturedBlogs()
    return {posts, projects: projects.data.items}
  },
}
</script>
