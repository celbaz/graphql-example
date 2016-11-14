import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

const Macro =  new GraphQLObjectType({
  name: "Macro",
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    template: {type: new GraphQLNonNull(GraphQLString)},
    locale: {type: new GraphQLNonNull(GraphQLString)}
  })
});

export default Macro;
