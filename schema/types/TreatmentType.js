const graphql = require("graphql");
const serviceType = require("./SeriveType");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const TreatmentType = new GraphQLObjectType({
  name: "Treatment",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    // booked: { type: GraphQLBoolean },
    // price: { type: GraphQLInt },
    // duration: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

module.exports = TreatmentType;
