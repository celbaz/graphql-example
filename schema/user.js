import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import contactResolver from '../resolvers/contact-resolver';
import ContactResponse from '../schema/contact';


const User = new GraphQLObjectType({
   name: "User",
   fields: () => ({
     id: {type: new GraphQLNonNull(GraphQLString)},
     name: {type: new GraphQLNonNull(GraphQLString)},
     contacts: {
       type: ContactResponse,
       resolve: contactResolver.getByUserId
     }
   })
});

export default User;
