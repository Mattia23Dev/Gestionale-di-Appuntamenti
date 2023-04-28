const graphql = require("graphql");
const mongoose = require("mongoose");
const ServiceType = require("../types/SeriveType");
const Service = require("../../models/service");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const deleteServiceMutation = {
  type: ServiceType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
    const deletedService = await Service.findByIdAndDelete({
      _id: args._id,
    });
    console.log(deletedService, "deleted", args._id);

    return {
      _id: args._id,
      ...deletedService,
    };
  }
}
};

module.exports = deleteServiceMutation;
