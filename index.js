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

  // This is used to create a required input object
  GraphQLInputObjectType,

  // This is used to create
  GraphQLInterfaceType,

  // This is the class we need to create the schema
  GraphQLSchema,

  // This function is used execute GraphQL queries
  graphql
} from 'graphql';

// 'results'
import contacts from './data/contact-resp';
import contactType from './data/contact-type-resp';
import macros from './data/macros-resp';
import users from './data/user-resp';
// Input Objects

// Common Interfaces

// Response Types
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
      resolve: function ({userId}){
        return users[userId];
      }
    },
    contactType: {
      type: ContactTypeResponse,
      resolve: function({contactTypeId}) {
        return contactType[contactTypeId];
      }
    }
  })
});


const ContactTypeResponse = new GraphQLObjectType({
  name: "ContactTypeResponse",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    parentId: {type: new GraphQLNonNull(GraphQLString)},
    childrenIds: { type: new GraphQLList(GraphQLID)},
    name: {type: GraphQLString},
    userType: {type: new GraphQLNonNull(GraphQLString)},
    isDeleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    macros: {
      type: new GraphQLList(Macro),
      resolve: function ({id}) {
        return macros[id];
      }
    }
  })
});

const Macro =  new GraphQLObjectType({
  name: "Macro",
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    template: {type: new GraphQLNonNull(GraphQLString)},
    locale: {type: new GraphQLNonNull(GraphQLString)}
  })
});

const User = new GraphQLObjectType({
   name: "User",
   fields: () => ({
     id: {type: new GraphQLNonNull(GraphQLString)},
     name: {type: new GraphQLNonNull(GraphQLString)}
   })
});

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
        return contacts[args.contactId];
      }
    },
    contactTypes: {
      type: ContactTypeResponse,
      args: {
        contactTypeId: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(rootValue, args) {
        return contactType[args.contactTypeId];
      }
    },
    user: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: function(rootValue, args) {
        return users[args.id];
      }
    }
  })
});

const query = `
  query GetContact {
    contact(contactId: "1") {
      contactTypeId,
      contactType {
        id,
        macros {
          name
        }
      },
      user {
        name
      }
    }
  }
`;

const Schema = new GraphQLSchema({
  query: Query
});

graphql(Schema, query, null, {someId: "1"}).then(function(result) {
  console.log("\n GRAPHQL RESULT START \n");
  console.log(JSON.stringify(result));
  console.log("\n GRAPHQL RESULT END");
});