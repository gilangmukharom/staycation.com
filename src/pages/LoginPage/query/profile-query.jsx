import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query profile {
    booking_app_profile {
      email
      password
      cekAdmin
    }
  }
`;

export const PROFILE_REGISTER = gql`
  mutation profile($object: booking_app_profile_insert_input!) {
    insert_booking_app_profile_one(object: $object) {
      uuid
    }
  }
`;
