import { gql } from "apollo-boost";
const { GraphQLUpload } = require("graphql-upload");

const addServiceMutation = gql`


  mutation(
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $duration: Int!
    $img:Upload
    $employees: [String]

  ) {
    addService(
      name: $name
      category: $category
      description: $description
      price: $price
      duration: $duration
     img:$img
     employees: $employees
    ) {
      name
      category
      description
      price
      duration
     img
      
     employees
      
    }
  }
`;

export default addServiceMutation;
