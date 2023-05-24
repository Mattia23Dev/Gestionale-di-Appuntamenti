const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLID } = graphql;

const clientDescriptionMutation = {
  type: ClientType,
  args: {
    _id: { type: GraphQLID },
    description:{ type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const temporaryFacebookAccessToken =
      context.cookies["temporary-facebook-access-token"];
    const accessToken = context.cookies["access-token"];

    let matchedClient;
    let client;
    let filter;

    // if (!context.isAuth) {
    //   throw new UserInputError("User is not authenticated.");
    // } else {
        console.log(args, "args")
      
        // if (accessToken) {
          client = await Client.findOne({
            _id: args._id,
          });
          filter = {
            _id: args._id,
          };
        
      // }
console.log(client, "client")
      const update = {
     
        description: args.description? args.description : client.description
      };

      matchedClient = await Client.findOneAndUpdate(filter, update, {
        new: true,
      });

      const res = matchedClient.save();

      return {
        ...res,
        id: matchedClient._id,
        firstName: matchedClient.firstName,
        lastName: matchedClient.lastName,
        email: matchedClient.email,
        phoneNumber: matchedClient.phoneNumber,
        password: matchedClient.password,
        description: matchedClient.description,
      };
    }
//   },
};

module.exports = clientDescriptionMutation;
