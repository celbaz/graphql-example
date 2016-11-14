import macroResolver from '../resolvers/macro-resolver';
import Macro from './macro';
import {
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,

  GraphQLObjectType
} from 'graphql';



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
      resolve: macroResolver
    }
  })
});


export default ContactTypeResponse;
