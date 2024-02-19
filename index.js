const express = require('express')
const mongoose = require("mongoose")
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

//database connection 
const DB_USER = 'rootadmin'
const DB_PASSWORD = 'root'
const DB_CLUSTER = 'cluster0.iuldthm.mongodb.net'
const DB_NAME = 'comp3133_assignment1'
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("MongoDB connection was established")
}).catch(error => {
    console.log("error: " + error)
})

//Server prep
const server = new ApolloServer({
    typeDefs,
    resolvers
})
const app = express()
const PORT = 4000

async function startApp () {
    await server.start()
    server.applyMiddleware({app})
    
    app.listen(PORT, ()=> console.log(`server is running at http:localhost:4000${server.graphqlPath}` ))
}


startApp()