import { gql } from "@apollo/client";

// Read Data
export const GET_ROOMS = gql`
  query room {
    booking_app_room(order_by: { timeStamp: asc }) {
      uuid
      nama_room
      lokasi
      image
      deskripsi
      harga
    }
  }
`;

// Read Data By Primary Key
export const GET_ROOM_BY_PK = gql`
  query room($uuid: uuid!) {
    booking_app_room_by_pk(uuid: $uuid) {
      uuid
      nama_room
      lokasi
      image
      deskripsi
      harga
    }
  }
`;
