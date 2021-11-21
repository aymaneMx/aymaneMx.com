<template>
  <div>
    <nav class="wrapper py-6 dark:bg-gray-900">
      <div class="px-10 flex justify-between items-center">
        <div class="logo">
          <nuxt-link to="/">
            <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-200"><span class="text-primary font-bold">Aymane</span>Mx.
            </h1>
          </nuxt-link>
        </div>

        <div class="flex flex-row">
          <nuxt-link class="nav-link" to="/posts">Blog</nuxt-link>
          <nuxt-link class="nav-link" to="/about">About</nuxt-link>
          <ColorSwitcher/>
        </div>

        <!--        <div class="ml-3 flex md:hidden">-->
        <!--          &lt;!&ndash; Mobile menu button &ndash;&gt;-->
        <!--          <button @click="toggle" class="flex-center rounded-md">-->
        <!--            <svg :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']" stroke="currentColor" fill="none" viewBox="0 0 24 24"-->
        <!--                 width="24" height="24">-->
        <!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>-->
        <!--            </svg>-->
        <!--            <svg :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']" stroke="currentColor" fill="none" viewBox="0 0 24 24"-->
        <!--                 width="24" height="24">-->
        <!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>-->
        <!--            </svg>-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </nav>
    <!--    <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">-->
    <!--      <div class="px-2 pt-2 pb-3 sm:px-3">-->
    <!--        <nuxt-link to="posts" class="mt-1 mobile-link focus:outline-none hover:text-primary">Blog</nuxt-link>-->
    <!--        <nuxt-link to="about" class="mt-1 mobile-link focus:outline-none hover:text-primary">About</nuxt-link>-->
    <!--        <nuxt-link to="/" class="mt-1 mobile-link focus:outline-none hover:text-primary">-->
    <!--          <span class="iconify" data-icon="bx:bxs-sun"></span>-->
    <!--        </nuxt-link>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>


<script>

import ColorSwitcher from "~/components/ColorSwitcher";

export default {
  components: {
    ColorSwitcher,
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  }
}
</script>

<style>
.mobile-link {
  @apply block px-3 py-2 text-lg text-gray-900 rounded-md text-white font-medium text-center;
}

.nav-link {
  @apply ml-5 font-medium text-center text-lg text-gray-700 dark:text-gray-200 dark:hover:text-primary hover:text-primary m-auto;
}
</style>
