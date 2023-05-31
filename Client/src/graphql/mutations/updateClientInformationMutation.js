import { gql } from "apollo-boost";

const updateClientInformationMutation = gql`
  mutation(
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $password: String
    $description:String
  ) {
    updateClientInformation(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
      description:$description
    ) {
      firstName
      lastName
      email
      phoneNumber
      password
      description
    }
  }
`;

export default updateClientInformationMutation;
