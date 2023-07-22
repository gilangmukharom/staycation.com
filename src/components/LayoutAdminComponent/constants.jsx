import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const SIDER_ITEM = [
  {
    key: "/admin/booking",
    icon: <CalendarOutlined />,
    label: <Link to="/admin/booking">Booking</Link>,
  },
  {
    key: "/admin/room-admin",
    icon: <HomeOutlined />,
    label: <Link to="/admin/room-admin">Room</Link>,
  },
];
