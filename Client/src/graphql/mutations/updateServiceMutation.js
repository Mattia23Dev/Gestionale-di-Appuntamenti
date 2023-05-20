import { gql } from "apollo-boost";

const updateServiceMutation = gql`
  mutation(
    $_id: ID
    $name: String
    $category: String
    $description: String
    $duration: Int
    $price: Int
    $img:Upload
    $employees:[String]
  ) {
    updateService(
      _id: $_id
      name: $name
      category: $category
      description: $description
      duration: $duration
      price: $price
      img:$img
      employees: $employees
    ) {
      _id
      name
      category
      description
      duration
      price
      img
      employees

    }
  }
`;
export default updateServiceMutation;
