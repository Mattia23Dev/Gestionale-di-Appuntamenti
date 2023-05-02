const graphql = require("graphql");
const serviceType = require("../types/SeriveType");
const Treatment = require("../../models/treatment");

const { GraphQLList } = graphql;

const treatmentQuery = {
  type: new GraphQLList(serviceType),
  async resolve(parent, args) {
    const response =await Treatment.find({});
    return response
  },
};

module.exports = treatmentQuery;
