---
draft: false
date: 2021-01-03T09:37:27+01:00
title: Using Vue.js alongside Django Template
description: This post aims to show that you can start to use Vue with your Django projects immediately without any sophisticated setup that will take hours to complete.
slug: using-vuejs-alongside-django-template
tags: django, vuejs, axios
cover: vue-django.png
---


Let’s imagine this scenario, you’re building a Django project, everything going very well. At some point, you needed to level up the interactivity of your app. what are you gonna do?

You will probably achieve the desired behavior using jquery or you will keep your models, build an API, and use a JavaScript SPA for the frontend.

What if I told you that you can keep everything you build with Django, get the interactivity and convenience of Vue.js, without all the overhead of a SPA setup?

This post aims to show that you can start to use Vue with your Django projects immediately without any sophisticated setup that will take hours to complete.

## A Demo App

![demo task app](~/assets/demo-task-app.png)

For a demo, I made a simple todo app, so I can play around with vue.js alongside the Django template.

The app shows the users' tasks, and the user can perform basic crud actions.

It looks really simple, but it’s a great way to practice some of the key concepts of Vue.

Try to create it yourself, and of course, If you get stuck, you can always get back to my code.

:zap: [https://github.com/aymaneMx/vuejs-alongside-django](https://github.com/aymaneMx/vuejs-alongside-django)

## Setup

If you check out [the official Vue guide](https://vuejs.org/v2/guide/#Getting-Started), they have links to a CDN where you can simply include Vue via a `<script>` tag into your Django template:

```html
<script src="<https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js>"></script>
```

```html
<div id="vue-app">
  [[ message ]]
</div>
```

```javascript
var app = new Vue({
  delimiters: ["[[", "]]"],
  el: '#vue-app',
  data: {
    message: 'Hello Vue!'
  }
})
```

That is it, we have already created our very first Vue app! Couple of things to notice here:

- `el`: stand for element, and it provides the Vue instance an existing DOM element to mount on.
- Usually, we don’t need to define the limiters explicitly but here we need to because the default delimiters of Vue are the same as the default delimiter of Django, so we need to use something else for Vue and that’s why we’re using `[[ ]]` here instead of `{{ }}` .

### Access Django Data from Vue

The easiest way is to access a Django template variable from Vue, is by using the built-in Django `json_script` filter.

```html
{{ django_variable | json_script:"js-data" }}
```

Go check the [documentation](https://docs.djangoproject.com/en/3.1/ref/templates/builtins/#json-script), its a pretty cool way to outputs a Python object as JSON, wrapped in a <script> tag, ready for use with JavaScript.

Unfortunately, This solution doesn't always work!

and that what happened to me when I tried to use the variable  `tasks` in the demo app:

```python
# todo/views.py
def home_view(request):
    tasks = Task.objects.all()
    context = {
        'tasks': tasks,
    }
    return render(request, 'home.html', context)
```

I get the following error!

```
Object of type QuerySet is not JSON serializable Django.
```

The way I solved this issue is by creating a task serializer,

```python
# todo/serializers.py
from rest_framework import serializers
from todo.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
```

and I use it in my view like this:

```python
# todo/views.py
from django.shortcuts import render
from todo.models import Task
from todo.serializers import TaskSerializer

def home_view(request):
    tasks = Task.objects.all()
    context = {
        'tasks': TaskSerializer(tasks, many=True).data,
    }
    return render(request, 'home.html', context)
```

## Consuming APIs

In the demo app, I was able to create, delete, update tasks, but only on the frontend side, nothing changed in the backend!

So I had to create a simple API that the Vue app can consume and display data from.

Next, I found myself googling how Vuejs consume APIs?

There are several ways to do so, but a very popular approach is to use [Axios](https://github.com/axios/axios), which is also recommended in [the official Vue Docs](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html).

Same as Vue, You can include Axios via a script tag to your Django template.

```html
<script src="<https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js>"></script>
```

To pass Django’s CSRF protection mechanism, Axios needs to include the respective cookie in its requests. To accomplish this is to set global Axios defaults:

```html
<script>
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
</script>
```

For example, let’s delete a task using Axios, assuming that `/api/<pk>/delete/` is the right endpoint.

```javascript
var url = '/api/' + task_id + '/delete/';
axios
	.delete(url)
	.then(response => {
		this.deleteTask(task_id)
	})
	.catch(error => {
		console.log(error);
	});
```

This call can be done within a Vue instance’s `mounted` hook or any other place where you can put JavaScript code.

## All done!

That wasn’t so hard! Now you can focus on building cool things with Vue on top of an API driven by Django.
