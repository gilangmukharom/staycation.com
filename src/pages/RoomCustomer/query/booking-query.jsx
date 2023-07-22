import { gql } from "@apollo/client";

// Read Booking Data
export const GET_BOOKING = gql`
  query booking {
    booking_app_booking {
      kode_booking
      nama_pemesan
      no_handphone
      nama_room
      lokasi_room
      tgl_check_in
      tgl_check_out
      total_harga
    }
  }
`;

// Insert Booking Data
export const ADD_BOOKING = gql`
  mutation booking($object: booking_app_booking_insert_input!) {
    insert_booking_app_booking_one(object: $object) {
      kode_booking
    }
  }
`;
