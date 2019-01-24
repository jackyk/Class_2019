import { Meteor } from 'meteor/meteor'
import { Sessions } from './sessions'
import { USSDCode } from '../config'
import { Teams, Voted} from './collections'
import {
    USSDRelease, USSDResponse,
    updateSession, getAndUpdateSession
} from './helpers'


const resolvers = {
    Query: {
        getTeams(){
            return Teams.find({}).fetch()
        }
    },
    Mutation: {
        // anytime initiate is called it is a new session
        initiate(_,args){
            delete args.type
            delete args.clientState
            delete args.serviceCode
        
            // add date and time
            // Blowing up the service and tracking time of response
            const session = Object.assign(
                args, {dateCreated: new Date()})
            // Insert session object
            Sessions.insert(session)

            return USSDRelease(
                `Welcome to our voting platform
                \n Vote for one team`,
                ''
            )
        },
        // _, this is the parent or roots of your args
    vote(_, args) {
        // console.log(args)
  
        const message = args.message
        const session = getAndUpdateSession(
          args.sessionId, args.sequence, args.message)
  
        if (args.sequence === 2)
          return USSDResponse('Enter team number', message)
  
        // stores team number in db
         if (args.sequence === 3) {
          const teamNumber = parseInt(args.message)
          const team = Teams.findOne({ number: teamNumber })
  
          // Make sure a voter cannot vote twice
        //   Fetches from the collection of the mobile number that was stored
          const voted = Voted.findOne({
            phoneNumber: args.phoneNumber
          })
          if (voted)
            return USSDRelease('You already voted.')
        //   if not voted add a new vote and increase it by one
          Teams.update(
            { number: teamNumber },
            { $inc: { votes: 1 } }
          )
          Voted.insert({
            phoneNumber: args.phoneNumber, teamNumber: teamNumber
          })
          return USSDRelease(
            `Success! You just voted for Team ${teamNumber}.`)
        }
      }
    },
  }
  
  export default resolvers