import React from "react";
import { Row, Table, Typography } from "antd";
import { GET_BOOKING } from "./query/booking-query";
import { useQuery } from "@apollo/client";
import { currencyRupiah } from "../../../helpers/currency-formater";

function Booking() {
  const { Title } = Typography;

  // GraphQL
  const {
    data: bookingData,
    loading: isBookingLoading,
    error: isBookingError,
  } = useQuery(GET_BOOKING);

  const TABLE_COLUMNS = [
    {
      title: "Kode Booking",
      dataIndex: "kode_booking",
      key: "kode_booking",
      render: (_, record) =>
        `BOOKING-${parseInt(record?.kode_booking.slice(0, 8), 32) % 100000000}`,
    },
    {
      title: "Nama Pemesan",
      dataIndex: "nama_pemesan",
      key: "nama_pemesan",
    },
    {
      title: "No Whatsapp",
      dataIndex: "no_handphone",
      key: "no_handphone",
    },
    {
      title: "Nama Room",
      dataIndex: "nama_room",
      key: "nama_room",
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi_room",
      key: "lokasi_room",
    },
    {
      title: "Tanggal Check-In",
      dataIndex: "tgl_check_in",
      key: "tgl_check_in",
    },
    {
      title: "Tanggal Check-Out",
      dataIndex: "tgl_check_out",
      key: "tgl_check_out",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, record) => `${record?.duration} malam`,
    },
    {
      title: "Total Harga",
      dataIndex: "total_harga",
      key: "total_harga",
      render: (_, record) => currencyRupiah(record?.total_harga),
    },
  ];

  return (
    <>
      <Title level={3}>Booking</Title>
      <Row>
        <Table
          className="table-room"
          rowKey="kode_booking"
          columns={TABLE_COLUMNS}
          dataSource={bookingData?.booking_app_booking}
          loading={isBookingLoading}
          style={{ width: "100%", marginTop: 24 }}
        />
      </Row>
    </>
  );
}

export default Booking;
