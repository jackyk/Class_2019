import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Query{
        initiate(
            sequence: Int,
            phoneNumber: String,
            sessionId: String,
            serviceCode: String,
            operator: String,
            message: String,
            clientState: String,
            type:String,
        ):[String]
        getTeams:[Team]
    }

    type mutation{
        vote(phoneNumber: String!, teamNumber: Int!): String
    }
    type Team{
        _id: String
        number: Int
        votes: Int
    }

    `
    export default typeDefs