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

// Create Data
export const ADD_ROOM = gql`
  mutation room($object: booking_app_room_insert_input!) {
    insert_booking_app_room_one(object: $object) {
      uuid
    }
  }
`;

// Update Data
export const UPDATE_ROOM = gql`
  mutation room(
    $_set: booking_app_room_set_input!
    $pk_columns: booking_app_room_pk_columns_input!
  ) {
    update_booking_app_room_by_pk(_set: $_set, pk_columns: $pk_columns) {
      uuid
    }
  }
`;

// Delete Data
export const DELETE_ROOM = gql`
  mutation room($uuid: uuid!) {
    delete_booking_app_room_by_pk(uuid: $uuid) {
      uuid
    }
  }
`;
