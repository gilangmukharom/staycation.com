import React, { useState } from "react";
import { Layout, Row, Menu, Button } from "antd";
import { MENU_ITEM_CUSTOMER } from "../constants";
import { Link } from "react-router-dom";
import "./headerComponent.css";

function HeaderComponent() {
  const token = localStorage.getItem("token");
  const path = window.location.pathname;
  const { Header } = Layout;
  const [current, setCurrent] = useState(path);

  const onClick = (values) => {
    setCurrent(values.key);
  };

  return (
    <>
      <Header
        className="customer"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          width: "100%",
        }}
      >
        <Row justify="space-between">
          <Link to="/home" className="brand-logo">
            <span>Stay</span>cation.com
          </Link>
          <div style={{ margin: "auto" }} />
          <Menu
            mode="horizontal"
            items={MENU_ITEM_CUSTOMER}
            disabledOverflow
            onClick={onClick}
            selectedKeys={[current]}
            style={{ marginRight: 24 }}
          />
          {!token ? (
            <Link to="/login">
              <Button type="primary">Login</Button>
            </Link>
          ) : (
            <Link to="/home">
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
          )}
        </Row>
      </Header>
    </>
  );
}

export default HeaderComponent;
