<template>
  <div class="wrapper-small md:px-10">
    <div class="header mt-5">
      <Hero/>
    </div>

    <div class="mt-16">
      <div class="flex justify-center items-center text-base font-semibold text-gray-600">
        <h4 class="text-center">Featured blogs </h4>
        <i class='bx bx-chevrons-down ml-1 mt-1'></i>
      </div>

      <div>
        <Projects/>
      </div>
    </div>


<!--    <div class="mt-16 md:mt-24">-->
<!--      <div class="flex justify-center items-center text-base font-semibold text-gray-600">-->
<!--        <h4 class="text-center">Tech stack I use.</h4>-->
<!--        <i class='bx bx-chevrons-down ml-1 mt-1'></i>-->
<!--      </div>-->

<!--      <div>-->
<!--        <TechStack/>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Social from '../components/Social.vue'
import Projects from '../components/Blogs.vue'
import TechStack from '../components/TechStack.vue'

export default {
  components:{
    Hero, Social, Projects, TechStack
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
};
</script>

<style>
</style>
