import { gql } from "apollo-boost";
const { GraphQLUpload } = require("graphql-upload");

const addServiceMutation = gql`
  mutation( $name:String!
   ) {
    
    addTreatment( name:$name) {
   
      name
    }
  }
`;

export default addServiceMutation;
