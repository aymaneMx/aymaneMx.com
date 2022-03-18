<script>
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-javascript'

export default {
  async asyncData({ $notion, params, error }) {
    const pageTable = await $notion.getPageTable(
      "7da47e094f104ed3ac77ce925bee90f5"
    )
    const til = pageTable.find(
      (item) => item.slug && item.slug === params.slug
    )
    const blockMap = await $notion.getPageBlocks(til ? til.id : params.slug)
    if (!blockMap || blockMap.error) {
      return error({ statusCode: 404, message: "Post not found" })
    }
    return { blockMap, til}
  },
  data() {
    return {
      pageLinkOptions: { component: "NuxtLink", href: "to" },
    }
  },
  head() {
    const til = this.til
    const title = til?.title
    const tags = til.tags || title
    const href = `https://aymanemx.com/til/${til.slug}`
    const meta = this.$prepareMeta(
      {title, keywords: `${tags}`, url: href},
      [{name: "article:published-time", content: til?.created_at || null},]
    )
    return {
      title,
      link: [{rel: "canonical", href}],
      meta,
    }
  }
}
</script>


<template>
  <NotionRenderer :block-map="blockMap" :page-link-options="pageLinkOptions" full-page prism/>
</template>


<style>
@import "vue-notion/src/styles.css";
.notion-title, .notion-text, .notion-list, .notion-callout-text, p , h1, h2, h3, h4, span {
  @apply dark:text-white;
}
.notion-link{
  @apply dark:hover:bg-red-500;
}
</style>
