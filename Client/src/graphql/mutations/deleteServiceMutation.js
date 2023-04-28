import { gql } from "apollo-boost";

const delteServiceMutation = gql`
  mutation($_id: ID) {
    deleteService(_id: $_id) {
      _id
    }
  }
`;

export default delteServiceMutation;
