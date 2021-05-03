<template>
  <div class="wrapper-small md:px-10">
    <div class="h-96 mt-5">
      <Hero/>
    </div>

    <Blogs :posts="posts" title="Featured blogs"/>
  </div>
</template>

<script>
import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";

export default {
  components:{
    TechStack,
    Hero,
    Blogs,
  },
  async asyncData({ $content}) {
    const featuredTitles = [
      "Building a Full-Text Search App Using Django, Docker and Elasticsearch",
      "GraphQl In Django - An Overview",
      "Using Vue.js alongside Django Template",
    ]
    const posts = await $content("posts")
      .sortBy('date', "desc")
      .where({ title: { $in: featuredTitles } })
      .fetch()
    return { posts }
  },
}
</script>
