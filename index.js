const {GraphQLServer}= require('graphql-yoga')
const {PrismaClient} = require('@prisma/client')

const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const Post = require("./src/resolvers/Post")
const Vote = require("./src/resolvers/Vote")
const Comment = require("./src/resolvers/Comment")


const resolvers = {
    Mutation,
    Query,
    Post,
    Comment,
    Vote
    // AuthPayload
    // User,
    // Post,

    
    
}

const suceess = "Thank you for voting"

const prisma = new PrismaClient

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: (request) => {
       return {
        ...request,
        prisma
       } 
    }
})

server.start(()=> console.log(`server is running at http://localhost:4000`))