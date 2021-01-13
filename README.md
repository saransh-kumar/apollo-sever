# apollo-sever



# 1.What is Apollo GraphQL?

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.On 7 November 2018, the GraphQL project was moved from Facebook to the newly-established GraphQL Foundation, hosted by the non-profit Linux Foundation.Since 2012, GraphQL's rise has followed the adoption timeline as set out by Lee Byron, GraphQL's creator, with accuracy.Byron's goal is to make GraphQL omnipresent across web platforms.

It provides an approach to developing web APIs and has been compared and contrasted with REST and other web service architectures. It allows clients to define the structure of the data required, and the same structure of the data is returned from the server, therefore preventing excessively large amounts of data from being returned, but this has implications for how effective web caching of query results can be. The flexibility and richness of the query language also adds complexity that may not be worthwhile for simple APIs.It consists of a type system, query language and execution semantics, static validation, and type introspection.




# 2. Difference between GraphQL and REST?

The Core Difference Between REST APIs and GraphQL
A REST API is an architectural concept for network-based software. GraphQL, on the other hand, is a query language, a specification, and a set of tools that operates over a single endpoint using HTTP. In addition, over the last few years, REST has been used to make new APIs, while the focus of GraphQL has been to optimize for performance and flexibility.

Where GraphQL Has the Upper Hand Over REST APIs
When using a REST API to fetch information, you’ll always get back a complete dataset. For example, if you wanted to request information from two objects, you’d need to perform two REST API requests. The advantage of REST APIs is its simplicity—you have one endpoint that does one task, so it’s easy to understand and manipulate. In other words, if you have X endpoint, it provides X data.

Conversely, if you wanted to gather some information from a specific endpoint, you couldn’t limit the fields that the REST API returns; you’ll always get a complete data set. This phenomenon is referred to as over fetching. GraphQL uses its query language to tailor the request to exactly what you need, from multiple objects down to specific fields within each entity. GraphQL would take X endpoint, and it can do a lot with that information, but you have to tell it what you want first.

In essence, GraphQL is extremely powerful, once you know how to use it. Because you are only fetching the data that you require, you limit the amount of processing required. As you begin to look at automation, these savings really start to add up.




# 3.What is GraphQL schema?

GraphQL schema look like this:
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}

We start with a special "root" object
We select the hero field on that
For the object returned by hero, we select the name and appearsIn fields
Because the shape of a GraphQL query closely matches the result, you can predict what the query will return without knowing that much about the server. But it's useful to have an exact description of the data we can ask for - what fields can we select? What kinds of objects might they return? What fields are available on those sub-objects? That's where the schema comes in.

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

Type language
GraphQL services can be written in any language. Since we can't rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple language. We'll use the "GraphQL schema language" - it's similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way.

Object types and fields
The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:

type Character {
  name: String!
  appearsIn: [Episode!]!
}
The language is pretty readable, but let's go over it so that we can have a shared vocabulary:

Character is a GraphQL Object Type, meaning it's a type with some fields. Most of the types in your schema will be object types.
name and appearsIn are fields on the Character type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Character type.
String is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
String! means that the field is non-nullable, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
[Episode!]! represents an array of Episode objects. Since it is also non-nullable, you can always expect an array (with zero or more items) when you query the appearsIn field. And since Episode! is also non-nullable, you can always expect every item of the array to be an Episode object.
Now you know what a GraphQL object type looks like, and how to read the basics of the GraphQL type language.





# 4. Resolver

Root fields & resolvers
At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the Root type or the Query type.

In this example, our Query type provides a field called human which accepts the argument id. The resolver function for this field likely accesses a database and then constructs and returns a Human object.

Query: {
  human(obj, args, context, info) {
    return context.db.loadHumanByID(args.id).then(
      userData => new Human(userData)
    )
  }
}
This example is written in JavaScript, however GraphQL servers can be built in many different languages. A resolver function receives four arguments:

obj The previous object, which for a field on the root Query type is often not used.
args The arguments provided to the field in the GraphQL query.
context A value which is provided to every resolver and holds important contextual information like the currently logged in user, or access to a database.
info A value which holds field-specific information relevant to the current query as well as the schema details, also refer to type GraphQLResolveInfo for more details.
Asynchronous resolvers
Let's take a closer look at what's happening in this resolver function.

human(obj, args, context, info) {
  return context.db.loadHumanByID(args.id).then(
    userData => new Human(userData)
  )
}
The context is used to provide access to a database which is used to load the data for a user by the id provided as an argument in the GraphQL query. Since loading from a database is an asynchronous operation, this returns a Promise. In JavaScript, Promises are used to work with asynchronous values, but the same concept exists in many languages, often called Futures, Tasks or Deferred. When the database returns, we can construct and return a new Human object.

Notice that while the resolver function needs to be aware of Promises, the GraphQL query does not. It simply expects the human field to return something which it can then ask the name of. During execution, GraphQL will wait for Promises, Futures, and Tasks to complete before continuing and will do so with optimal concurrency.

Trivial resolvers
Now that a Human object is available, GraphQL execution can continue with the fields requested on it.

Human: {
  name(obj, args, context, info) {
    return obj.name
  }
}
A GraphQL server is powered by a type system which is used to determine what to do next. Even before the human field returns anything, GraphQL knows that the next step will be to resolve fields on the Human type since the type system tells it that the human field will return a Human.

Resolving the name in this case is very straight-forward. The name resolver function is called and the obj argument is the new Human object returned from the previous field. In this case, we expect that Human object to have a name property which we can read and return directly.

In fact, many GraphQL libraries will let you omit resolvers this simple and will just assume that if a resolver isn't provided for a field, that a property of the same name should be read and returned.

Scalar coercion
While the name field is being resolved, the appearsIn and starships fields can be resolved concurrently. The appearsIn field could also have a trivial resolver, but let's take a closer look:

Human: {
  appearsIn(obj) {
    return obj.appearsIn // returns [ 4, 5, 6 ]
  }
}
Notice that our type system claims appearsIn will return Enum values with known values, however this function is returning numbers! Indeed if we look up at the result we'll see that the appropriate Enum values are being returned. What's going on?

This is an example of scalar coercion. The type system knows what to expect and will convert the values returned by a resolver function into something that upholds the API contract. In this case, there may be an Enum defined on our server which uses numbers like 4, 5, and 6 internally, but represents them as Enum values in the GraphQL type system.

List resolvers
We've already seen a bit of what happens when a field returns a list of things with the appearsIn field above. It returned a list of enum values, and since that's what the type system expected, each item in the list was coerced to the appropriate enum value. What happens when the starships field is resolved?

Human: {
  starships(obj, args, context, info) {
    return obj.starshipIDs.map(
      id => context.db.loadStarshipByID(id).then(
        shipData => new Starship(shipData)
      )
    )
  }
}
The resolver for this field is not just returning a Promise, it's returning a list of Promises. The Human object had a list of ids of the Starships they piloted, but we need to go load all of those ids to get real Starship objects.

GraphQL will wait for all of these Promises concurrently before continuing, and when left with a list of objects, it will concurrently continue yet again to load the name field on each of these items.

