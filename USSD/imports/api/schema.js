import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Query{
        getTeams: [Team]
    }
    type Mutation{ 
    initiate(
        // the different screen you see all the time
            sequence: Int,
            phoneNumber: String,
            sessionId: String,
            serviceCode: String,
            operator: String,
            message: String,
            clientState: String,
            type:String,
        ):[String]

    vote(
        // shows different strings
        sequence: Int,
        phoneNumber: String,
        sessionId: String,
        serviceCode: String,
        operator: String,
        // the selection you take
        message: String,
        // Whatever info you need for the second operation
        clientState: String,
        // Response(when user is providing an input
        //Release(When giving feedback to your user that does not require input)
        type: String,
    ):[String]
    }
    type Team{
        _id: String
        number: Int
        votes: Int
    }

    `
    export default typeDefs