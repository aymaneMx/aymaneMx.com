<template>
<blogs :posts="posts" title="Blogs"/>
</template>


<script>
import Blogs from "@/components/Blogs";

export default {
  components: {Blogs},
  head: {
      title: "AymaneMx's Blog",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "aymaneMx's blog about python, django, vuejs."
        }
      ]
  },
  methods:{
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },
  async asyncData({ $content}) {
    const posts = await $content("posts").sortBy('date', "desc").fetch()
    return { posts }
  },
}
</script>
