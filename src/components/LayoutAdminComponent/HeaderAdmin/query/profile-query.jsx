import { gql } from "@apollo/client";

export const GET_PROFILE_NAME = gql`
  query profile {
    booking_app_profile {
      firstName
    }
  }
`;
