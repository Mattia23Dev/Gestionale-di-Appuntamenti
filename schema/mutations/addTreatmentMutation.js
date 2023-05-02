const graphql = require("graphql");
const TreatmentType = require("../types/TreatmentType");
const Treatment = require("../../models/treatment");
const serviceType = require("../types/SeriveType");

const { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } = graphql;

const addTreatmentMutation = {
  type: TreatmentType,
  args: {
    // booked: { type: new GraphQLNonNull(GraphQLBoolean) },
    name: { type: GraphQLString },
  },

  async resolve(parent, args) {
    let treatment = new Treatment({
    //   booked: args.booked,
      name: args.name,
    });
    return await treatment.save();
  },
};

module.exports = addTreatmentMutation;
