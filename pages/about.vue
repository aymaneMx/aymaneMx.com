<script>
export default {
  head: {
    title: "About"
  },
  data: () => ({ blockMap: null }),
  async asyncData({ $notion }) {
    // use Notion module to get Notion blocks from the API via a Notion pageId
    const blockMap = await $notion.getPageBlocks(
      "ad2346af0894443d8906cf78de4f310f"
    );
    return { blockMap }
  },
}
</script>


<template>
  <NotionRenderer
    :blockMap="blockMap"
    fullPage prism/>
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
