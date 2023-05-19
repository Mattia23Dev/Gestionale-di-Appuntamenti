const graphql = require("graphql");
const serviceType = require("../types/SeriveType");
const Service = require("../../models/service");

const { GraphQLList } = graphql;

const servicesQuery = {
  type: new GraphQLList(serviceType),
  async resolve(parent, args) {
    const response =await Service.find({});
    // console.log(response, "response")
   
    return response
  },
};

module.exports = servicesQuery;
