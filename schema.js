import {
  // These are the basic GraphQL types
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,
} from 'graphql';

// Resolve functions, these are used to fetch information.
import contactResolver from './resolvers/contact-resolver';
import contactTypeResolver from './resolvers/contact-type-resolver';
import userResolver from './resolvers/user-resolver';


// Common Objects/ Fanouts
import ContactResponse from './schema/contact.js';
import ContactTypeResponse from './schema/contact-type.js';
import User from './schema/user.js';



// This is an object that contains all query functions in our "domain".
const Query = new GraphQLObjectType({
  name: "RootQueries",
  description: "This is the Root query where all queryable fields exist",
  fields: () =>({
    contact: {
      type: ContactResponse,
      args: {
        contactId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (rootValue, args) {
        return contactResolver.getByContactId(args);
      }
    },
    contactTypes: {
      type: ContactTypeResponse,
      args: {
        contactTypeId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(rootValue, args) {
        return contactTypeResolver(args);
      }
    },
    user: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: function(rootValue, args) {
        return userResolver(args);
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});


export default Schema;
