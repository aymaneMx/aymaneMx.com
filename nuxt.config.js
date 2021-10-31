export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'aymaneMx.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'aymaneMx -- django developer' },
      /* Twitter */
      {hid: "twitter:card", name: "twitter:card", content: "summary"},
      {hid: "twitter:site", name: "twitter:site", content: "@aymane_max"},
      {hid: "twitter:creator", name: "twitter:creator", content: "@aymane_max"},
      {hid: "twitter:title", name: "twitter:title", content: "aymaneMx.com"},
      {hid: "twitter:description", name: "twitter:description", content: 'aymaneMx -- django developer'},
      {hid: "twitter:image", name: "twitter:image", content: '/favicon.png'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/util",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'vue-notion/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/image',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  colorMode: {
    classSuffix: ''
  },
}
