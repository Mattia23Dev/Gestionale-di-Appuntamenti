import { gql } from "apollo-boost";

const getTreatmentQuery = gql`
  {
    treatments {
      

    _id
    
    name
      
    }
  }
`;

export default getTreatmentQuery;
