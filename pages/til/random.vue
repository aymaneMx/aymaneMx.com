<template>
  <div >
    <h1> Random TIL </h1>
  </div>
</template>

<script>

export default {
  async asyncData({$notion, params, error, redirect}) {
    const pageTable = await $notion.getPageTable("7da47e094f104ed3ac77ce925bee90f5")
    const tils = pageTable.filter((til) => til.slug)

    // FIXME: don't redirect user to the same TIL twice
    const item = tils[Math.floor(Math.random()*tils.length)]
    if (item){
      redirect('/til/' + item.slug)
    }
    redirect('/')
  },
}
</script>
