<template>
  <div class="mt-20">
    <div
      class="flex justify-center items-center text-base font-semibold text-gray-600 dark:text-gray-300"
    >
      <h2 class="text-center">{{ title }}</h2>
      <IconDoubleDown class="h-4 w-4" />
    </div>


    <div class="wrapper-small my-5">
      <h3 class="text-primary mt-8 font-semibold mb-6">{{ message }}</h3>

      <form class="w-full" action="POST" @submit.prevent="submit($event)">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4 mb-5">
            <label for="fullName" class="block mb-2 text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required="required"
              class="text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-dark-light block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-primary  dark:focus:border-gray-500 mb-2 p-4"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-5">
            <label for="email" class="block mb-2 text-gray-700 dark:text-gray-200">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required="required"
              class="text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-dark-light block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-primary  dark:focus:border-gray-500 mb-2 p-4"
            />
          </div>
          <div class="w-full px-4 mb-5">
            <label for="Message" class="block mb-2 text-gray-700 dark:text-gray-200">
              Message
            </label>
            <textarea
              id="Message"
              rows="6"
              type="text"
              name="Message"
              placeholder="Enter your message"
              required="required"
              class="text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-dark-light block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-primary  dark:focus:border-gray-500 mb-2 p-4"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end w-full">
          <button
            type="submit"
            class="inline-flex shadow text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border-0 py-3 px-8 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Blogs',
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    submit(event) {
      const data = new FormData(event.target)

      this.$axios
        .$post('https://formspree.io/f/mgedapdp', data)
        .then((response) => {
          this.message =
            'Thank you for getting in touch!'
          event.target.reset()
        })
        .then((response) => {
          console.log(response)
        })
    },
  },
}
</script>
