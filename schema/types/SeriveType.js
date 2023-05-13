const graphql = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } =
  graphql;

const ServiceType = new GraphQLObjectType({
  name: "ServiceType",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    duration: { type: GraphQLInt },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    img: { type: GraphQLString },
  }),
});

module.exports = ServiceType;
