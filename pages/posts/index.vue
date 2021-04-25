<template>
  <div class="wrapper-small md:px-10">
    <div class="mt-16">
      <div class="flex justify-center items-center text-base font-semibold text-gray-600">
        <h4 class="text-center">All blog posts</h4>
        <i class='bx bx-chevrons-down ml-1 mt-1'></i>
      </div>

      <div class="project-card md:flex mt-8" v-for="post of posts" :key="post.slug">
        <div class="img max-w-lg md:max-w-sm  mx-auto m-2">
          <img src="~/assets/vue-vite.png" class="rounded-xl" alt="">
        </div>
        <div class="flex flex-col justify-between max-w-lg mx-auto">
          <div class="txt md:px-5 lg:px-0">
            <h2 class="text-xl font-semibold text-gray-800">{{ post.title }}</h2>
            <p class="font-semibold text-gray-600 text-sm">{{ formatDate(post.createdAt) }}</p>
            <span class="font-semibold text-gray-600 text-sm">Tags: {{ post.tags }}</span>
            <p class="text-base text-gray-700 my-1">{{ post.description }}</p>
            <nuxt-link :to="post.path" class="text-base font-semibold text-gray-700 my-3 hover:underline">Read more >
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  methods:{
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },
  async asyncData({ $content}) {
    const posts = await $content("posts").fetch()
    return { posts }
  },
}
</script>
