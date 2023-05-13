import { gql } from "apollo-boost";

const getServiceQuery = gql`
  {
    services {
      name
      price
      duration
      category
      description
      _id
    }
  }
`;

export default getServiceQuery;
