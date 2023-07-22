import React, { useState } from "react";
import { Layout, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import { SIDER_ITEM } from "../constants";
import "./siderAdmin.css";

function SiderAdmin() {
  const path = window.location.pathname;
  const { Sider } = Layout;

  const [current, setCurrent] = useState(path);

  const onClick = (values) => {
    setCurrent(values.key);
  };
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={280}
        style={{ backgroundColor: "#fff" }}
      >
        <Link
          to="/"
          className="brand-logo"
          style={{
            margin: "13px 0 13px 0",
            display: "block",
            textAlign: "center",
          }}
        >
          <span>Stay</span>cation.com
        </Link>
        <Menu
          mode="inline"
          defaultSelectedKeys={[current]}
          items={SIDER_ITEM}
        />
      </Sider>
    </>
  );
}

export default SiderAdmin;
