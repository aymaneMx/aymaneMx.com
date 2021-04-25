<script>
export default {
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()
    return { post }
  }
}
</script>


<template>
  <div class="wrapper p-5 mt-20">
    <div class="max-w-screen-lg mx-auto px-3 py-5">
      <h1 class="text-6xl text-gray-800 font-medium"> {{ post.title }}</h1>
<!--      <p class="text-sm text-gray-700 font-semibold mt-5">{{ post.date }} · 5min read</p>-->
<!--      <p class="text-sm font-semibold mt-2">{{ post.tags }}</p>-->
      <div class="img max-w-full mx-auto m-5">
        <img src="~/assets/vue-vite.png" class="rounded-xl shadow-lg" alt="">
      </div>
    </div>
    <nuxt-content class="prose prose-lg max-w-screen-lg mx-auto px-3 my-5" :document="post" />
  </div>
</template>

