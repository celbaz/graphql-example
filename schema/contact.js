import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} from 'graphql';

// Resolve functions, these are used to fetch information.
import contactResolver from '../resolvers/contact-resolver';
import contactTypeResolver from '../resolvers/contact-type-resolver';
import userResolver from '../resolvers/user-resolver';


// Common Objects/ Fanouts
import ContactTypeResponse from './contact-type.js';
import User from './user.js';


const ContactResponse = new GraphQLObjectType({
  name: "ContactResponse",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    requesterId: {type: new GraphQLNonNull(GraphQLID)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    status: {type: new GraphQLNonNull(GraphQLString)},
    internalStatus: {type: new GraphQLNonNull(GraphQLString)},
    locale: {type: new GraphQLNonNull(GraphQLString)},
    nodeId: {type: new GraphQLNonNull(GraphQLString)},
    tier: {type: GraphQLString},
    contactTypeId: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLString)},
    user: {
      type: User,
      resolve: userResolver
    },
    contactType: {
      type: ContactTypeResponse,
      resolve: contactTypeResolver
    }
  })
});

export default ContactResponse;
