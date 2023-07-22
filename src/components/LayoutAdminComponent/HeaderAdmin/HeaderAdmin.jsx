import React from "react";
import { Layout, Row, Button } from "antd";
import { Link } from "react-router-dom";
import "./headerAdmin.css";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_NAME } from "./query/profile-query";

function HeaderAdmin() {
  const { Header } = Layout;

  // GraphQL
  const {
    data: profileData,
    loading: isProfileLoading,
    error: isProfileError,
  } = useQuery(GET_PROFILE_NAME);

  const items = [
    {
      key: "1",
      label: (
        <Link to="/">
          <Button
            type="primary"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("cekAdmin");
            }}
            danger
          >
            Logout
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Header
      className="admin"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        width: "100%",
      }}
    >
      <Row justify="space-between">
        <div />
        {}

        <Link to="/">
          <Button
            type="primary"
            danger
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("cekAdmin");
            }}
          >
            Logout
          </Button>
        </Link>
      </Row>
    </Header>
  );
}

export default HeaderAdmin;
