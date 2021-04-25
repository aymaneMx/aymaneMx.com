---
draft: false
date: 2020-08-16T12:28:12+01:00
title: Building a Full-Text Search App Using Django, Docker and Elasticsearch
description: In this article, I will be giving you brief information about Elasticsearch, its installation, and some examples of usage.
slug: building-a-full-text-search-app-using-django-docker-and-elasticsearch 
tags: python, django, docker, elasticsearch
cover: /images/posts/django-docker-elasticsearch.png
---


> This article is originally published on [https://obytes.com/](https://www.obytes.com/blog/building-a-full-text-search-app-using-django-docker-and-elasticsearch)

In this article, I will be giving you brief information about Elasticsearch, its installation, and some examples of usage.

## Elasticsearch – basic concepts

Elasticsearch is a real-time distributed and open-source full-text search and analytics engine. It is accessible from a RESTful web service interface and uses schema-less JSON (JavaScript Object Notation) documents to store data. It is built on Java programming language, which enables Elasticsearch to run on different platforms. It enables users to explore a very large amount of data at a very high speed.

There are some Elasticsearch basics that -once you’ve internalized them- make the learning curve less traumatic.
I’ve put together 4 of the most important concepts:

**Fields:** the smallest individual unit of data in Elasticsearch. Each field has a defined datatype; the core data-types (strings, numbers, dates, booleans), or complex data-types (object and nested).

**Index:** a collection of different types of documents and document properties. It can be compared to a database in the world of relational databases.

**Documents:** a collection of fields defined in the JSON format in a specific manner. Every document belongs to a type and resides inside an index. In the world of relational databases, documents can be compared to a row in a table.

**Mapping:** a collection of documents sharing a set of common fields present in the same index. Again, it's like a schema in the world of relational databases.

⚠️ It is worth mentioning that Elasticsearch can't be used as a database, it wasn't built for this purpose. Due to that, it's best if you use it as an additional service in your project next to PostgreSQL, MySQL, or other databases.

## Using Elasticsearch with Django

Many tutorials are using [Django-Haystack](https://django-haystack.readthedocs.io/), which is very widely used in the Django community, as a modular search to plug ElasticSearch (or any other search engine such as Solr, Whoosh, Xapian, etc.), for its minimal configurations and the query syntax is similar to Django’s ORM.

I have used it with [Solr](https://lucene.apache.org/solr/) recently in a project and I was impressed with how easy it implemented, I loved it, but I will not use it in this article, I think that Elasticsearch itself is simple to use.

I will be using Docker to run Elasticsearch.

Here is the [source code](https://github.com/aymaneMx/django-elasticsearch) I will be using, so you can see exactly what is going on.

![let us begin](/images/posts/let-us-begin.gif)

### Elasticsearch instance

Edit `docker-compose.yml` in your project directory to add an ES service:

```yaml
es:
    image: elasticsearch:7.8.1
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
```

Then add `es` to the services that Django app service depends on, and `ELASTICSEARCH_DSL_HOSTS=es:9200` to `docker-compose.env`:

```yaml
web:
    build: .
    command: python /code/manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - 8000:8000
    env_file:
      - docker-compose.env
    depends_on:
      - db
      - es    <--- here
```

Now run `docker-compose up -d --build`

You can check if it works correctly via curl:

```bash
curl -X GET localhost:9200/_cluster/health
```

### Set up ElasticSearch

let's Install Django Elasticsearch DSL. Use your favorite Python package manager to install the app from PyPI, I use pipenv.

```yaml
pipenv install django-elasticsearch-dsl
```

As with most Django applications, you should add `django_elasticsearch_dsl` to the INSTALLED_APPS within your settings file:

```python
INSTALLED_APPS = [
    ...
    'django_elasticsearch_dsl',
    ...
]
```

You must then define ELASTICSEARCH_DSL in your Django settings.

```python
# Elasticsearch
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': os.getenv("ELASTICSEARCH_DSL_HOSTS", 'localhost:9200')
    },
}
```

### Index data into ElasticSearch

Let's consider the following model:

```python
class Post(models.Model):
    title = models.CharField(max_length=128)
    content = models.CharField(max_length=5000)
    created_at = models.DateTimeField(default=timezone.now)
    likes = models.PositiveIntegerField(default=0)
    slug = models.SlugField(max_length=128, db_index=True, null=True)
    draft = models.BooleanField(default=True)

    user = models.ForeignKey(
        User,
        related_name='posts',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

    class Meta:
        app_label = 'posts'
```

Then we should run the migrations:

```bash
docker-compose run web python manage.py makemigrations
docker-compose run web python manage.py migrate
```

Now let’s define ElasticSearch index, It required to define Document class in `documents.py` in your app directory.

```python
from django.contrib.auth import get_user_model
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Post, Reply

User = get_user_model()

@registry.register_document
class PostDocument(Document):
    user = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'username': fields.TextField(),
    })

    class Index:
        name = 'posts'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Post

        fields = [
            'title',
            'content',
            'created_at',
            'likes',
            'draft',
            'slug',
        ]

    def get_queryset(self):
        return super(PostDocument, self).get_queryset().select_related(
            'user'
        )

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, User):
            return related_instance.posts.all()
        elif isinstance(related_instance, Reply):
            return related_instance.post
```

### Examples of usage

To populate the database with some content, I made a command for that reason, just run:

```bash
docker-compose run web python manage.py load_posts 20
```

Now, let's hop into the interactive Python shell (`docker-compose run web python manage.py shell`) and play around with ElasticSearch queries:

```
>>> from posts.documents import PostDocument
>>> posts = PostDocument.search()
>>> for hit in posts:
...     print(hit.title)
...
Design half three bar quickly material center.
Author true left. Position entire someone study be.
School draw individual sell produce brother.
Truth drug compare TV modern.
Expert apply baby reveal team along.
Beautiful for suddenly half.
Plant argue enough less order receive sing.
Store economy offer decision industry.
Beat chair affect assume score occur include laugh.
Language poor cell fish worry ready industry use.
>>>
```

Next, I gathered here a list of examples of use you may need:

```python
search = PostDocument.search()

# Filter by single field equal to a value
search = search.query('match', draft=False)

# Filter by single field containing a value
search = search.filter('match_phrase', title="value")

# Add the query to the Search object
from elasticsearch_dsl import Q
q = Q("multi_match", query='python django', fields=['title', 'content'])
search = search.query(q)

# Query combination
or_q = Q("match", title='python') | Q("match", title='django')
and_q = Q("match", title='python') & Q("match", title='django')
search = search.query(or_q)

# Exclude items from your query
search = search.exclude('match', draft=True)

# Filter documents that contain terms within a provided range.
# eg: the posts created for the past day
search = search.filter('range', created_at={"gte": "now-1d"})

# Ordering
# prefixed by the - sign to specify a descending order.
search = search.sort('-likes', 'created_at')
```

Quick quiz for you 😄 you can submit your answer in the comments 👇

> How to get the published posts created in the past week that contains the word ‘use’ in its title/content?

## That’s it!

To be honest, this got quite long. If you are patient enough to read this full and find it interesting then please share it.
