import { gql } from "apollo-boost";

const addDescription = gql`
  mutation($description: String
    $_id: ID
    
    ) {
    addDescription(description: $description
    _id: $_id    ) {
      description
      _id
    }
  }
`;

export default addDescription;
