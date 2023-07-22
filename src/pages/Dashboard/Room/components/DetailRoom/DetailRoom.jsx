import React from "react";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import Gap from "../../../../../components/Gap/Gap";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_ROOM_BY_PK } from "../../query/room-query";
import { Row, Space, Typography, Image, Col } from "antd";
import { Link } from "react-router-dom";
import { currencyRupiah } from "../../../../../helpers/currency-formater";

function DetailRoom() {
  const { Title } = Typography;
  const { uuid } = useParams();

  // GET Room By uuid (PK)
  const {
    data: roomData,
    loading: isRoomLoading,
    error: isRoomError,
  } = useQuery(GET_ROOM_BY_PK, {
    variables: { uuid },
  });

  const data = roomData?.booking_app_room_by_pk;

  return (
    <>
      {isRoomLoading ? (
        <LoadingComponent />
      ) : (
        <section id="detail-room">
          <Title level={2}>Detail Room</Title>

          <Gap height={48} />

          <Row justify="center">
            <Space direction="vertical" align="center">
              <Title>{data?.nama_room}</Title>
              <p>{data?.lokasi}</p>

              <Gap height={24}></Gap>

              <Image
                src={data?.image}
                alt="product-room"
                height={350}
                style={{ borderRadius: 15 }}
              />
            </Space>
          </Row>

          <Gap height={48} />

          <Row justify="start">
            <Col span={24}>
              <Space direction="vertical" style={{ display: "block" }}>
                <Title level={5}>Deskripsi</Title>
                <p>{data?.deskripsi}</p>
              </Space>
            </Col>

            <Col span={24} style={{ marginBottom: 32 }}>
              <Space
                direction="horizontal"
                align="middle"
                style={{ marginTop: 24 }}
              >
                <Title level={5}>Harga</Title>
                <p>
                  <span>{currencyRupiah(data?.harga)}</span>
                </p>
              </Space>
            </Col>
          </Row>

          <Link
            to="/admin/room-admin"
            className="btn-kembali"
            style={{ display: "inline-block" }}
          >
            Kembali
          </Link>
        </section>
      )}
    </>
  );
}

export default DetailRoom;
