import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';


const User = new GraphQLObjectType({
   name: "User",
   fields: () => ({
     id: {type: new GraphQLNonNull(GraphQLString)},
     name: {type: new GraphQLNonNull(GraphQLString)}
   })
});

export default User;
