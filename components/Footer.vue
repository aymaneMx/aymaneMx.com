<template>
  <div class="wrapper mx-auto px-5">
    <hr class="h-px mt-6 border-gray-300 max-w-screen-xl mx-auto">
    <div class="md:py-5">
      <div class="flex flex-col items-center justify-between mt-6 md:mt-0 md:flex-row">
        <div class="logo">
          <nuxt-link to="/">
            <h1 class="text-xl font-semibold text-gray-700"> <span
              class="text-primary font-bold">Aymane</span>Mx.</h1>
          </nuxt-link>
        </div>


        <div>
          <Social/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Social from '../components/Social.vue'

export default {
  components: {
    Social
  }
}
</script>
