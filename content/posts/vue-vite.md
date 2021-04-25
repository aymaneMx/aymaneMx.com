---
draft: false
date: 2021-04-05T09:37:27+01:00
title: Set up a Vue app running on Vite
description: This is a beginner guide on how to set up a vue.js app running on Vite. I’ll also add and configure ESLint & Prettier for linting and code formatting, set up Tailwind CSS for styling, and finally configure VueX and Vue Router.
slug: set-up-Vue-app-running-on-vite
tags: vuejs, vitejs, tailwind-css, vuex, vue-router, eslint
cover: /images/posts/vue-vite.png
---

This is a beginner guide on how to set up a vue.js app running on Vite, I’ll also add and configure ESLint & Prettier for linting and code formatting, set up Tailwind CSS for styling, and finally configure VueX and Vue Router.

So, let’s begin!

### Set up Vite.js

Wait, what the heck is Vite.js?

Primarily Vue developers will be using Vue CLI to compile their projects, this comes with some disadvantages: You have to wait until your entire app to be bundled to start developing, this can make cold server start very slow. Larger projects can also suffer from slow Hot Module Replacement (HMR). Vite tackles these issues by compiling code on-demand, only compiling the code imported on the current screen and HMR performance is decoupled from the total number of modules, making HMR consistently fast no matter how big your app is.

Actually, Vite has a real good [doc](https://vitejs.dev/guide/), check it out.

If you're using `npm`, just run this command and follow the steps;

```bash
$ npm init @vitejs/app
```

### Set up Tailwind CSS

```bash
$ npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Create config file:

```bash
$ npx tailwindcss init -p
```

Include Tailwind in your CSS

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, ensure your CSS file is being imported in your ./src/main.js file:

```jsx
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

see [doc](https://tailwindcss.com/docs/guides/vue-3-vite) for more.

### Install ESLint & Prettier

```bash
$ npm install --save-dev eslint prettier eslint-plugin-vue eslint-config-prettier
```

create file `.eslintrc.js` and past those configs;

```jsx
module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        'prettier',
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'error',
    },
}
```

And create `a.prettierrc.js` file with the following configs:

```jsx
module.exports = {
    semi: false,
    tabWidth: 4,
    useTabs: false,
    printWidth: 80,
    endOfLine: 'auto',
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'always',
}
```

### Install Vue Router

For what! why we need Vue Router?

Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.

We need version 4 for Vue 3, so let's run,

```bash
$ npm install vue-router@4
```

Than, create `src/router/index.js` file with the following code where we will create the router, initiate it with a component called `Home` linked to the path `/` (we will create the component in the coming steps):

```jsx
import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
```

In `App.vue` replace the `helloworld` component to `<router-view/>`.

Create a home component eg:

```html
<template>
  <h1>Home!!</h1>
</template>
```

Import the router in `main.js` and use it before the app mounted!

```jsx
import router from "./router/index"
createApp(App).use(router).mount('#app')
```

### Install Vuex

It’s basically a state management library, that you probably won’t need it if you’re building a simple app.

```bash
$ npm install vuex@next --save
```

see [doc](https://vuex.vuejs.org/guide/#the-simplest-store) for more.

Now, You're ready to shape your Vue app! 

Finally, here's the source code for my demo app:

:zap: [https://github.com/aymaneMx/vite-app](https://github.com/aymaneMx/vite-app)

Enjoy! And see you next time.

### Resources:

- [Getting started with Vite, a no bundler DEV environment for Vue.js](https://medium.com/@wearethreebears/getting-started-with-vite-a-no-bundler-dev-environment-for-vue-js-217a6eb7c9d0).
- [Getting started with Vue 3 + Vite in 2021](https://youtu.be/O8epzPrsADI).
