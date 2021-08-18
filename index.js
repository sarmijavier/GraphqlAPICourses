`use strict`

const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync, read } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// define schema

const schema = buildSchema(
	readFileSync(join(__dirname, 'lib', 'schema.graphql'),
	'utf-8'
	)
)



// run hello query
// graphql(schema, '{ saludo }', resolvers).then((data) => console.log(data))
// set resolvers up
/* const resolvers = {
  hello: () => {
    return 'Hola Mundo'
  }
} */


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true // work on development env
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/graphql`)
})
