import React from "react";
import "./homePage.css";
import { Typography, Button, Row, Col, Carousel, Card, Spin } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { currencyRupiah } from "../../helpers/currency-formater";
import { GET_ROOMS } from "./query/room-query";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

function HomePage() {
  const { Title } = Typography;
  const { Meta } = Card;

  // GraphQL
  const {
    data: roomCustomerData,
    loading: roomCustomerLoading,
    error: roomCustomerError,
  } = useQuery(GET_ROOMS);

  const scrollToSection = () => {
    const sectionRoom = document.querySelector("#room");
    window.scrollTo({
      top: sectionRoom.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="welcomeSection">
        <Row justify="space-between" align="middle" style={{ height: 480 }}>
          <Col span={10}>
            <Title className="h1">
              My Trip My Adventure,
              <br /> Start Next Vacation
            </Title>
            <p>
              We provide what you need to enjoy you vacation with your family.
              It's time to create unforgettable moments.
            </p>

            <Button
              type="primary"
              htmlType="submit"
              className="btn-show-me"
              onClick={scrollToSection}
            >
              Show Me Now
            </Button>
          </Col>
          <Col span={12} style={{ padding: "0 0 0 50px" }}>
            {roomCustomerLoading ? (
              <LoadingComponent />
            ) : (
              <Carousel autoplay>
                {roomCustomerData?.booking_app_room?.slice(0, 4).map(
                  (item, index) =>
                    index < 4 && (
                      <div className="carousel-item" key={index}>
                        <img src={item.image} />
                      </div>
                    )
                )}
              </Carousel>
            )}
          </Col>
        </Row>
      </section>

      <section id="room">
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Title level={4}>Houses With Beauty Backyard</Title>
          <Link to="/room-customer" className="btn-view-all">
            View All
          </Link>
        </Row>
        <Row gutter={[30, 30]} justify="space-between">
          {roomCustomerLoading ? (
            <LoadingComponent />
          ) : (
            roomCustomerData?.booking_app_room?.slice(0, 4)?.map(
              (room, index) =>
                index < 4 && (
                  <Col key={index} span={6}>
                    <Link to={`/room-customer/${room.uuid}`}>
                      <Card
                        className="card-list-room"
                        hoverable
                        cover={<img src={room.image} />}
                      >
                        <Meta
                          title={room.nama_room}
                          description={room.lokasi}
                        />
                        <p className="price">
                          <span>{currencyRupiah(room.harga)}</span>/malam
                        </p>
                      </Card>
                    </Link>
                  </Col>
                )
            )
          )}
        </Row>
      </section>
    </>
  );
}

export default HomePage;
