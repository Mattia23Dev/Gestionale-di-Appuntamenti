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
  GraphQLList
} = graphql;

const addServiceMutation = {
  type: ServiceType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },

    price: { type: new GraphQLNonNull(GraphQLInt) },

    duration: { type: new GraphQLNonNull(GraphQLInt) },
    img: { type: GraphQLUpload },
    employees:{type:GraphQLList(GraphQLString)}
  },

  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];
    console.log(args.img, "e");

    if (adminAccessToken) {
      const { createReadStream, filename } = await args.img;
      const stream = createReadStream();
      const path = `./uploads/${filename}`;
      console.log(path, path);
      await new Promise((resolve, reject) => {
        stream
          .on("error", (error) => {
            fs.unlink(path, () => {
              reject(error);
            });
          })
          .pipe(fs.createWriteStream(path))
          .on("error", (error) => {
            reject(error);
          })
          .on("finish", () => {
            resolve();
          });
      });

      let newService = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price,
        duration: args.duration,
        img: filename,
        employees:args.employees
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
