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
      img
      employees
    }
  }
`;

export default getServiceQuery;
