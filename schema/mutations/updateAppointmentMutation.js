const graphql = require("graphql");
const mongoose = require("mongoose");
const AppointmentType = require("../types/AppointmentType")
const { UserInputError } = require("apollo-server");
const createNotificationFunction = require("./notifications/createNotificationFunction");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const ClientType = require("../types/ClientType");
const Appointment = require("../../models/appointment");
const AddOnType = require("../types/AddOnType");
const TreatmentType = require("../types/TreatmentType");
const TreatmentInput = require("../types/inputs/TreatmentInput");
const AddOnInput = require("../types/inputs/AddOnInput");
const ClientInput = require("../types/inputs/ClientInput");

const { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// Hide usernames and passwords
require("dotenv").config();

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const updateAppointmentMutation = {
  type: AppointmentType,
  args: {
    _id: { type: GraphQLID },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    morningOrEvening: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    price: { type: GraphQLInt },
    esthetician: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    bookedWithCardSquareID: { type: GraphQLString },
    client: { type: ClientInput },
    treatments: { type: new GraphQLList(TreatmentInput) },
    addOns: { type: new GraphQLList(AddOnInput) },
    notes: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const selectedAppointment = await Appointment.findOne({
        _id: args._id,
      });

      const update = {
        date: args.date ? args.date : selectedAppointment.date,
        startTime: args.startTime ? args.startTime : selectedAppointment.startTime,
        endTime: args.endTime ? args.endTime : selectedAppointment.endTime,
        duration: args.duration ? args.duration : selectedAppointment.duration,
      };

      const updatedAppointment = await Appointment.findOneAndUpdate(
        {
          _id: args._id,
        },
        update,
        {
          new: true,
        }
      );

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const updatingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "updatePersonalEvent",
        date: args.date,
        time: args.startTime,
        esthetician: args.esthetician,
        originalAssociatedStaffFirstName: args.staff ? args.staff.split(" ")[0] : '',
        originalAssociatedStaffLastName: args.staff ? args.staff.split(" ")[1] : '',
        createdByFirstName: updatingEmployee.firstName,
        createdByLastName: updatingEmployee.lastName,
        createdAt: Date.now(),
      });

      const updateNotifications = (staff) =>
        createNotificationFunction(newNotification, staff);

      (
        await Employee.find({
          employeeRole: "Admin",
          _id: { $ne: decodedAdminID },
        })
      ).forEach((currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      });

      const updatedEmployee = await Employee.findOne(
        { _id: decodedAdminID },
        (err, currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      const updatedAppointmentRes = await updatedAppointment.save();

      return {
        ...updatedAppointmentRes._doc,
        ...updatedEmployeeRes._doc,
      };
    }
  },
};

module.exports = updateAppointmentMutation;
