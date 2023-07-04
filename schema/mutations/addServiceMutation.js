const graphql = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Service = require("../../models/service");
const ServiceType = require("../types/SeriveType");
const { GraphQLUpload } = require("graphql-upload");
const fs = require("fs");
const { join } = require("path");
const { createWriteStream } = require("fs");
const { v4: uuidv4 } = require("uuid");
const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLNull,
  GraphQLList,
} = graphql;

const addServiceMutation = {
  type: ServiceType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },

    price: { type: new GraphQLNonNull(GraphQLInt) },

    duration: { type: new GraphQLNonNull(GraphQLInt) },
    employees:{type:GraphQLList(GraphQLString)},
  },

  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (adminAccessToken) {

      let newService = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price,
        duration: args.duration,
        employees:args.employees,
      });

      const service = await newService.save();
      console.log("service", service);

      return {
        ...service,
      };
    }
  },
};

module.exports = addServiceMutation;
