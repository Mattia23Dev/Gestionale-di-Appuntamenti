import { gql } from "apollo-boost";

const adminLoginQuery = gql`
  query($email: String, $password: String) {
    adminLogin(email: $email, password: $password) {
      _id
      accessToken
      refreshToken
      dummyToken
    }
  }
`;

export default adminLoginQuery;
