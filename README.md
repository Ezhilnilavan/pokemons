### Backend (`/backend`)
We have provided you with a simple [GraphQL](https://graphql.org/learn) server that serves Pokemon data. The server is non-persistent and therefore on server restart, data will reset.

To run the server:

```
$ cd backend
$ npm install
$ npm start
```

After running the backend, you can access https://localhost:4000/graphql in the browser, you'll be presented with a GraphQL Playground that allows you to run Queries and Mutations as well as view the GraphQL Schema.

A sample query:
```
query { pokemons(query: { limit: 10, offset: 0 }) { edges { name } } }
```

### Frontend (`/frontend`)
Within the folder frontend there is a simple boilerplate of a Vue app, created using the Vue CLI and based on the default Sites preset which includes: vue-router, vuex, sass, babel, eslint, unit-jest, e2e-cypress. Feel free to change this folder as you wish.

To run the frontend: 

```
$ cd frontend
$ npm install
$ npm run serve
```

Access your application within http://localhost:8080/.

