---
draft: false
date: 2020-04-08T15:04:24+01:00
title: GraphQl In Django - An Overview
slug: graphql-in-django-overview 
tags: python, django, graphql, graphene
cover: graphql-in-django-overview.png
---


Since being introduced by Facebook, GraphQL has been presented as a revolutionary alternative to REST APIs, GraphQL fixes many problems found with RESTful architecture. 
<!--more-->
However, it also introduces a new set of challenges which need to be evaluated. This blog post will walk through things you should know about using graphQl API with Django ?


## GraphQL (basic concepts)
GraphQl is a data query language and specification developed by Facebook for internal use in its native mobile apps in 2012 to handle sloppy networks and low internet speeds, before being publicly open sourced in 2015.

The major benefit of GraphQL is the fact that clients can retrieve exactly the data they need from the API. They don’t have to rely on REST endpoints that return predefined and fixed data structures. Instead, the client can dictate the shape of the response objects returned by the API.

**Main features**
- Sending multiple queries in one request
- Query defines what data should be defined
- Only one endpoint handles all requests

**Operations**
- Queries - fetching data
- Mutations - modifying data on the server
- Subscriptions - real-time data exchange over websockets

It is worth mentioning that all operations are sent as POST requests to a single endpoint `/graphql`.

**Schema**

The schema is one of the most important concepts when working with a GraphQL API. It specifies the capabilities of the API and defines how clients can request the data. It is often seen as a contract between the server and client.

Generally, a schema is simply a collection of GraphQL types. However, when writing the schema for an API, there are some special root types:

```
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

## How can we build such a thing in python?
Before I start talking about graphql using python, I'd like to highlight two concepts related to the schema.

When creating a GraphQL service, we can decide to have the schema be the source of truth and let all our implementation code match its definitions, or we can have our code be the source of truth and have the schema be an artifact generated from the code. The two approaches are called, respectively, schema-first and code-first.

### Schema-first
Schema-first indicates that we first define the schema for the GraphQL service, and then we implement the code by matching the definitions in the schema. The most popular Python library for implementing GraphQL servers using schema-first approach is [Ariadne](https://github.com/mirumee/ariadne/); it's quite new, simple to use and open for extension.

### Code-first
In the code-first approach, we start by coding the resolvers, and then, from code as a single source of truth, we have the schema generated as an artifact. Thus, we still have a schema, but instead of being manually created, it is created through running a script. This approach may also be called resolver-first.

The most popular library that provides tools to implement a GraphQL API in Python using a code-first approach is [Graphene](http://graphene-python.org/).

Actually Graphene is the most popular GraphQL framework for Python (Over 5k stars on github), because it is fully featured with integrations for the most popular web frameworks and ORMs.

## Django Support
Django is supported by the 2 libraries previously mentioned, but since Ariadne is quite new, we will go with Graphene!
There is a library called `Graphene-Django` which is built on top of Graphene, and provides some additional abstractions that make it easy to add GraphQL functionality to your Django project.

For example, Graphene :
- Has a built-in view
- It can create types from django models
- It can create mutations from Forms and DRF Serializers
- Has support for django filters

If you are interested in building a graphql API step by step, consider visiting [#HowToGraphQl](https://www.howtographql.com/graphql-python/1-getting-started/) tutorial, one of best starting points.

## Authentication & permissions
When using GraphQL with HTTPs you have 3 options for authentication:
- **Sessions**:
Basically you rely on the browser sending cookies to your backend service, this works pretty well with Django. Good when you don’t have a mobile application.

- **HTTP Headers**:
You can use headers when you have third party clients accessing your API or when you have a mobile app. Usually it is used in combination with JWT tokens.

- **Field arguments**:
This might be a good solution when you only have a few fields that require authentication. It could work like this:
```graphql
{
  links(token: "YFWh87T") {
    id
    description
    url
  }
}
```

The concept of authentication and authorization is enabled by default in Django using sessions. Since most of the web apps today are stateless, we will go with the second option which is the JWT Authentication provided by [django-graphql-jwt](https://github.com/flavors/django-graphql-jwt).

The library creates three Mutations:
```python
class Mutation(users.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
```

- `TokenAuth` : is used to authenticate the User with its username and password to obtain the JSON Web token.
- `VerifyToken` : to confirm that the token is valid, passing it as an argument.
- `RefreshToken` : to obtain a new token within the renewed expiration time for non-expired tokens, if they are enabled to expire.

This library also gives access to restrict permission to particular fields by using [decorators](https://django-graphql-jwt.domake.io/en/latest/decorators.html):

```python
__all__ = [
    'login_required',
    'user_passes_test',
    'staff_member_required',
    'superuser_required',
    'permission_required',
]
```
In django we have the same decorators to limit access to views, so here we can decorate either resolver functions or the mutations, so it's fairly simple.

## Protection against malicious queries
We'r giving a lot of control to the user with graphql, we basically allowing them to query data from our server, instead of asking for legitimate, useful data, a malicious actor could submit an expensive, nested query, so it's really easy to create malicious queries!

```graphql
query maliciousQuery {
  thread(id: "some-id") {
    messages(first: 99999) {
      thread {
        messages(first: 99999) {
          thread {
            messages(first: 99999) {
              thread {
                # ...repeat times 10000...
              }
            }
          }
        }
      }
    }
  }
}
```

Letting this kind of query through is very bad, since it exponentially increases the amount of objects loaded and will crash your entire server.

To prevent bad queries to happen we can adopt various solutions:
- **Timeouts:** Check how long a query is taking, if it is taking more than 1 second you can kill it.
- **Limits on nested fields:** You can parse the incoming GraphQL request and deny queries that are requesting for fields that are too nested. For example, you can only allow for maxing 3 levels of nesting and no more.
- **Query cost:** This is useful if you have third party clients and when you also want to limit their API usage.
- **Hide introspection for production mode** (this is not common solution, but sounds good).


unfortunately, there is no official answers to these problems in Graphene, but All this approaches can be implemented by creating a middleware and a custom backend.

## Problems & Limitations

As GraphQL is in an early stage of adoption, it has some weaknesses, like building a fully-fledged API requires additional third-party libraries :

- [JWT authentication and permissions](https://github.com/flavors/django-graphql-jwt)
- [File upload](https://github.com/lmcgartland/graphene-file-upload): there’s no way to upload files directly as part of your mutations.
thankfully, [@jaydenseric](https://github.com/jaydenseric) has come up with a [solution](https://github.com/jaydenseric/graphql-multipart-request-spec) that combine the power of GraphQL with the ease of uploading files in a multi-part request.
- [Optimize database access inside graphene queries](https://github.com/tfoxy/graphene-django-optimizer): because it's really easy to fill into the famous N+1 problem, In this regard this library came to optimize the queries using `select_related`, `prefetch_related` and `only` methods of Django QuerySet.
So, if you're working on high-load back-end, Better to avoid Graphql, as it is harder to optimize.


The problems mentioned above are related only to Graphene!, here are the ones related to Graphql itself:

- The queries always return an HTTP status code of 200, regardless of whether that query was successful. If the query is unsuccessful, the response JSON will have a top-level error key with associated error messages and stacktrace. This can make it much more difficult to do error handling and can lead to additional complexity for things like monitoring.

- Another disadvantage is the lack of built-in caching support. Because REST APIs have multiple endpoints, they can leverage native HTTP caching to avoid refetching resources. With GraphQL, you will need to set up your own caching support which means relying on another library, or setting up something like globally unique IDs for your backend.

## Summary

To sum up:
- GraphQL is a great tool for data exchange between the backend and frontend, while using it has several downsides...
- Despite the limitations, Graphene is still the most developed GraphQL framework for Python.

By reading this article, I would suppose that you know enough to decide whether you will use GraphQl in your next Django project or not.

Thanks for reading!

> This article is originally published on [https://obytes.com/](https://www.obytes.com/blog/graphql-in-django-an-overview)
