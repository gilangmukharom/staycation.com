import { gql } from "@apollo/client";

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
      duration
      total_harga
    }
  }
`;
