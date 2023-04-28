import { gql } from "apollo-boost";
const { GraphQLUpload } = require('graphql-upload');

const addServiceMutation = gql`


  mutation(
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $duration: Int!
    $img:Upload
   
  ) {
    addService(
      name: $name
      category: $category
      description: $description
      price: $price
      duration: $duration
     img:$img
    ) {
      name
      category
      description
      price
      duration
     img
      
  
      
    }
  }
`;

export default addServiceMutation;
