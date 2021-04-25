<script>
export default {
  async asyncData({ $content, params }) {
    console.log($content, params)
    const post = await $content('about', params.slug).fetch()
    return { post }
  }
}
</script>


<template>
  <div class="wrapper p-5">
    <nuxt-content class="prose prose-lg max-w-screen-lg mx-auto px-3 my-5" :document="post" />
  </div>
</template>
