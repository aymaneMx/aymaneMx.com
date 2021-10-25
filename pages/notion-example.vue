<template>
  <NotionRenderer
    :blockMap="blockMap"
    :pageLinkOptions="pageLinkOptions"
    fullPage prism/>
</template>


<script>
import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-shell-session'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-graphql'

export default {
  data() {
    return {
      pageLinkOptions: { component: "NuxtLink", href: "to" },
    };
  },
  async asyncData({ $notion, params, error }) {
    const pageTable = await $notion.getPageTable(
      "ceef6f1a895a46b2a0e4a87b41405547"
    );
    console.log(pageTable)
    const page = pageTable.find(
      (item) => item.public
        // && item.slug === params.slug
    );
    const blockMap = await $notion.getPageBlocks(page ? page.id : params.slug);
    if (!blockMap || blockMap.error) {
      return error({ statusCode: 404, message: "Post not found" });
    }
    return { blockMap };
  }
};
</script>

<style>
@import "vue-notion/src/styles.css";

.notion .notion-title, .notion-text, .notion-list, .notion-callout-text, p h1, h2, h3, h4 {
  @apply dark:text-white;
}
.notion-link{
    @apply dark:hover:bg-red-500;
}
</style>
