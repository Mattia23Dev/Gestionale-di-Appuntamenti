const graphql = require("graphql");
const mongoose = require("mongoose");

const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");
const Service = require("../../models/service");
const serviceType = require("../types/SeriveType");
const { GraphQLUpload } = require("graphql-upload");
const fs = require("fs");
const { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt } = graphql;

require("dotenv").config();

const updateServiceMutation = {
  type: serviceType,
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },

    duration: { type: GraphQLInt },
    price: { type: GraphQLInt },
    img: { type: GraphQLUpload },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const service = await Service.findOne({
        _id: args._id,
      });
      if (args.img) {
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

        const update = {
          name: args.name ? args.name : service.name,
          category: args.category ? args.category : service.category,
          description: args.description
            ? args.description
            : service.description,
          duration: args.duration ? args.duration : service.duration,
          price: args.price ? args.price : service.price,
          img: filename.img ? filename.img : service.img,
        };

        const updateService = await Service.findOneAndUpdate(
          {
            _id: args._id,
          },
          update,
          {
            new: true,
          }
        );

        const updatedService = await updateService.save();

        return {
          ...updatedService,
        };
      } else {
        const update = {
          name: args.name ? args.name : service.name,
          category: args.category ? args.category : service.category,
          description: args.description
            ? args.description
            : service.description,
          duration: args.duration ? args.duration : service.duration,
          price: args.price ? args.price : service.price,
          img: service?.img,
        };

        const updateService = await Service.findOneAndUpdate(
          {
            _id: args._id,
          },
          update,
          {
            new: true,
          }
        );

        const updatedService = await updateService.save();

        return {
          ...updatedService,
        };
      }
    }
  },
};

module.exports = updateServiceMutation;
