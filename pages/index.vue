<template>
  <div class="wrapper-small md:px-10">
    <div class="h-96 mt-5">
      <Hero/>
    </div>

    <Blogs :posts="posts" title="Featured blogs"/>
    <Projects :projects="projects"/>
  </div>
</template>

<script>
// you don't need to import components (directly in component folder)
import Blogs from "@/components/Blogs";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default {
  components: {
    Projects,
    Hero,
    Blogs,
  },
  async asyncData({$axios}) {

    // FIXME: is there a nice way to store static data?
    // https://www.freecodecamp.org/news/how-to-use-flat-file-data-in-a-static-nuxt-app/
    const posts = [
      {
        "created_at": "2020-04-08",
        "description": "By reading this article, I would suppose that you know enough to decide whether you will use GraphQl in your next Django project or not.",
        "slug": "graphql-in-django-an-overview",
        "thumbnail": [
          {
            "url": "https://www.notion.so/image/https:%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67f8d966-9fdc-42eb-bf4a-4d566de481ed%2Fgraphql-in-django-overview.png?table=block&id=5869efc1-2402-41e8-b242-c4cb6e711646&cache=v2"
          }
        ],
        "tags": ["python", "django", "graphql", "graphene"],
        "public": true,
        "title": "GraphQl In Django - An Overview"
      },
      {
        "created_at": "2020-08-16",
        "description": "In this article, I will be giving you brief information about Elasticsearch, its installation, and some examples of usage.",
        "slug": "building-a-full-text-search-app-using-django-docker-and-elasticsearch",
        "thumbnail": [
          {
            "url": "https://www.notion.so/image/https:%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F59d56643-9de8-493a-b01a-aac63ff7490e%2Fdjango-docker-elasticsearch.png?table=block&id=5925638b-504d-40d9-8a18-289f49ce3bdc&cache=v2"
          }
        ],
        "tags": ["python", "django", "elasticsearch", "docker"],
        "public": true,
        "title": "Building a Full-Text Search App Using Django, Docker and Elasticsearch"
      },
      {
        "created_at": "2021-01-03",
        "description": "This post aims to show that you can start to use Vue with your Django projects immediately without any sophisticated setup that will take hours to complete.",
        "slug": "using-vuejs-alongside-django-template",
        "thumbnail": [
          {
            "url": "https://www.notion.so/image/https:%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1c6ede05-960b-4164-af7f-6e1c3915a8ee%2Fvue-django.png?table=block&id=985f575f-ff8e-4026-ac18-1d6765924786&cache=v2"
          }
        ],
        "tags": ["django", "vuejs", "axios"],
        "public": true,
        "title": "Using Vue.js alongside Django Template"
      }
    ]


    const projects = await $axios
      .get(
        'https://api.github.com/search/repositories?q=user:aymanemx&sort=stars&per_page=3'
      )
      .catch((errors) => {
        // console.log(errors)
      })
    return {posts, projects: projects.data.items};
  },
}
</script>
