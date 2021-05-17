<template>
  <div class="wrapper-small md:px-10">
    <div class="h-96 mt-5">
      <Hero/>
    </div>

    <Blogs :posts="posts" title="Featured blogs"/>
    <Projects :projects="projects" />
  </div>
</template>

<script>
import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";

export default {
  components:{
    Projects,
    TechStack,
    Hero,
    Blogs,
  },
  async asyncData({ $content, $axios }) {
    const featuredTitles = [
      "Building a Full-Text Search App Using Django, Docker and Elasticsearch",
      "GraphQl In Django - An Overview",
      "Using Vue.js alongside Django Template",
    ]
    const posts = await $content("posts")
      .sortBy('date', "desc")
      .where({ title: { $in: featuredTitles } })
      .fetch()

    const projects = await $axios
      .get(
        'https://api.github.com/search/repositories?q=user:aymanemx&sort=stars&per_page=3'
      )
      .catch((errors) => {
        console.log(errors)
      })
    return { posts: posts, projects: projects.data.items };
  },
}
</script>
