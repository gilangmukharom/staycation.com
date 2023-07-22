import React, { useState } from "react";
import "./detailRoomCustomerPage.css";
import Gap from "../../../../components/Gap/Gap";
import LoadingComponent from "../../../../components/LoadingComponent/LoadingComponent";
import dayjs from "dayjs";
import {
  Row,
  Col,
  Space,
  Image,
  Typography,
  Card,
  DatePicker,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { currencyRupiah } from "../../../../helpers/currency-formater";
import { GET_ROOM_BY_PK } from "../../query/room-query";
import { GET_BOOKING, ADD_BOOKING } from "../../query/booking-query";
import { useQuery, useMutation } from "@apollo/client";

function DetailRoomCustomerPage() {
  const token = localStorage.getItem("token");
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { Title } = Typography;
  const [formBooking] = Form.useForm();
  const date = dayjs();

  // const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  // Regex Validasi
  const noHandphoneRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

  // GraphQL
  // Get room by pk
  const {
    data: roomCustomerData,
    loading: roomCustomerLoading,
    error: roomCustomerError,
  } = useQuery(GET_ROOM_BY_PK, {
    variables: { uuid },
  });
  const roomData = roomCustomerData?.booking_app_room_by_pk;

  // Get Booking Data
  const {
    data: bookingData,
    loading: isBookingLoading,
    error: isBookingError,
  } = useQuery(GET_BOOKING);

  // Add Booking Data
  const [addBooking, { loading: loadingAddBooking }] = useMutation(
    ADD_BOOKING,
    { refetchQueries: [GET_BOOKING] }
  );

  const onAddBooking = (values) => {
    const body = {
      nama_room: roomData?.nama_room,
      lokasi_room: roomData?.lokasi,
      total_harga: roomData?.harga,
      duration: 1,
      ...values,
    };

    addBooking({
      variables: {
        object: {
          ...body,
        },
      },
    });

    setLoading(true);
    setTimeout(() => {
      message.success({
        content: "Berhasil Booking",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {roomCustomerLoading ? (
        <LoadingComponent />
      ) : (
        <section id="detail-room-customer">
          <Row justify="center">
            <Space direction="vertical" align="center">
              <Title level={2}>{roomData?.nama_room}</Title>
              <div>
                <Space direction="horizontal" align="center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{ width: 16, height: 16 }}
                    >
                      <path
                        fill="currentCollor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>
                  {roomData?.lokasi}
                </Space>
              </div>
              <Gap height={50} />
              <Image
                src={roomData?.image}
                height={400}
                style={{ borderRadius: 15 }}
              />
              <Gap height={70} />
            </Space>
          </Row>

          <Row gutter={[24]} justify="space-between">
            <Col span={12}>
              <Title level={5}>Deskripsi</Title>
              <Gap height={24} />
              <p>{roomData?.deskripsi}</p>
            </Col>

            <Col span={10}>
              <Card
                className="booking-form-card"
                size="large"
                title="Form Pemesanan"
              >
                <Title level={3} style={{ marginBottom: 32 }}>
                  {currencyRupiah(roomData?.harga)}{" "}
                  <span style={{ fontWeight: 300 }}>/malam</span>
                </Title>

                <Form
                  name="form_booking"
                  form={formBooking}
                  onFinish={onAddBooking}
                  layout="vertical"
                >
                  <Form.Item
                    label="Nama Pemesan"
                    name="nama_pemesan"
                    rules={[
                      {
                        required: true,
                        message: "Masukkan Nama",
                      },
                      {
                        whitespace: true,
                        message: "Tidak boleh diawali spasi",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Nomer Whatsapp"
                    name="no_handphone"
                    rules={[
                      {
                        required: true,
                        message: "Masukkan No handphone",
                      },
                      {
                        pattern: noHandphoneRegex,
                        message: "No Handphone tidak valid",
                      },
                      {
                        whitespace: true,
                        message: "Tidak boleh diawali spasi",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Row justify="space-between" style={{ marginBottom: 32 }}>
                    <Form.Item
                      label="Tanggal Check-In"
                      name="tgl_check_in"
                      rules={[
                        {
                          required: true,
                          message: "Masukkan tanggal check-in",
                        },
                      ]}
                      style={{ width: "calc(50% - 8px)" }}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                      label="Tanggal Check-Out"
                      name="tgl_check_out"
                      rules={[
                        {
                          required: true,
                          message: "Masukkan tanggal check-out",
                        },
                      ]}
                      style={{ width: "calc(50% - 8px)" }}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Row>

                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={loading}
                    onClick={() => {
                      if (!token) {
                        navigate("/login");
                      }
                    }}
                  >
                    Pesan Sekarang
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </section>
      )}
    </>
  );
}

export default DetailRoomCustomerPage;
