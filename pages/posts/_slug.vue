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
      <h1 class="text-6xl text-gray-800 font-medium dark:text-gray-100"> {{ post.title }}</h1>
<!--      <p class="text-sm text-gray-700 font-semibold mt-5">{{ post.date }} · 5min read</p>-->
<!--      <p class="text-sm font-semibold mt-2">{{ post.tags }}</p>-->
      <div class="img max-w-full mx-auto m-5">
        <nuxt-img :src="`/imgs/${post.cover}`" :alt="post.title" class="rounded-xl shadow-lg"/>
<!--        <img :src="require(`~/assets/${post.cover}`)" :alt="post.title" class="rounded-xl shadow-lg">-->
      </div>
    </div>
    <nuxt-content class="prose prose-lg max-w-screen-lg mx-auto px-3 my-5 dark:text-gray-100" :document="post" />
  </div>
</template>



<style>
.nuxt-content blockquote {
  @apply dark:text-white;
}
.nuxt-content p a {
  @apply dark:text-gray-50;
  @apply dark:hover:text-primary;
}
.nuxt-content li a {
  @apply dark:text-gray-50;
  @apply dark:hover:text-primary;
}
.nuxt-content h1, h2, h3, h4 {
  @apply dark:text-gray-50;
}
.nuxt-content strong {
  @apply dark:text-gray-50;
}
.nuxt-content h2 code {
  @apply dark:text-purple-300;
}
.nuxt-content h3 code {
  @apply dark:text-purple-300;
}
.nuxt-content h4 code {
  @apply dark:text-purple-300;
}
.nuxt-content li code {
  @apply dark:text-purple-300;
}
.nuxt-content p code {
  @apply dark:text-purple-300;
}
</style>
