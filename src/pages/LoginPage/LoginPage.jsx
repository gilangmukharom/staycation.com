import React, { useState } from "react";
import {
  LockOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, message, Spin, Space, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE, PROFILE_REGISTER } from "./query/profile-query";

function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [radio, setRadio] = useState("login");
  const [loading, setLoading] = useState(false);

  // Regex Validation
  const emailRegex = /^[a-zA-Z0-9._+]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // GraphQL
  const {
    data: profileData,
    loading: isProfileLoading,
    error: isProfileError,
  } = useQuery(GET_PROFILE);

  // register
  const [register, { loading: isRegisterLoading }] = useMutation(
    PROFILE_REGISTER,
    {
      refetchQueries: [GET_PROFILE],
    }
  );

  const handleRadio = ({ target: { value } }) => {
    setRadio(value);
    console.log(value);
  };

  const onLogin = (values) => {
    const profileLogin = [...profileData?.booking_app_profile];

    // mengecek login (admin)
    const cekAdmin = profileLogin?.find(
      (user) =>
        user.email === values.email &&
        user.password === user.password &&
        user.cekAdmin === true
    );

    // mengecek login (customer)
    const cekCustomer = profileLogin?.find(
      (user) =>
        user.email === values.email &&
        user.password === values.password &&
        user.cekAdmin === false
    );

    // mengecek user apakah sudah sesuai dengan data yang ada
    const isVerified = profileLogin?.some(
      (user) => user.email === values.email
    );

    if (!isVerified) {
      Modal.warning({
        title: "Email belum terdaftar",
        content: "Registrasi terlebih dahulu",
        centered: true,
        onOk() {
          form.resetFields();
        },
      });
    } else if (cekAdmin || cekCustomer) {
      localStorage.setItem("token", true);
      localStorage.setItem("cekAdmin", cekAdmin ? true : false);
      setLoading(true);

      setTimeout(() => {
        message.success({
          content: `Login sebagai ${cekAdmin ? "Admin" : "Customer"}`,
        });
        setLoading(false);
        navigate(cekAdmin ? "/admin/booking" : "/");
      }, 1000);
    } else {
      Modal.warning({
        title: "Email atau Password salah",
        content: "Silahkan coba lagi",
        centered: true,
      });

      form.resetFields();
      setRadio("login");
      setLoading(false);
    }
  };

  const onRegister = (values) => {
    const profileRegister = [...profileData?.booking_app_profile];

    // is user existed?
    const isExisted = profileRegister?.some(
      (user) => user.email === values.email
    );

    if (!isExisted) {
      register({
        variables: {
          object: {
            ...values,
          },
        },
        onError: (err) => {
          message.open({
            type: "error",
            content: `${err.message}`,
          });
        },
        onCompleted: () => {
          Modal.success({
            title: "Register Success!",
            content: "Please login using your account",
            centered: true,
            onOk() {
              form.resetFields(), setRadio("login");
            },
          });
        },
      });
    } else {
      Modal.warning({
        title: "Register Failed!",
        content: "Your email has already been used",
        centered: true,
      });
    }
  };

  return (
    <div className="container-form">
      <Spin spinning={loading}>
        <Radio.Group
          className="radio-group-login"
          defaultValue="login"
          buttonStyle="solid"
          onChange={handleRadio}
          style={{ width: "100%" }}
        >
          <Radio.Button value="login">login</Radio.Button>
          <Radio.Button value="register">Register</Radio.Button>
        </Radio.Group>

        <Form
          onFinish={radio === "login" ? onLogin : onRegister}
          style={{
            marginTop: 20,
          }}
        >
          {radio === "login" ? (
            <>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  {
                    type: "email",
                    pattern: emailRegex,
                    message: "Please enter a valid email",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Email"
                  prefix={<MailOutlined style={{ paddingRight: 4 }} />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password minimal 8 karakter" },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined style={{ paddingRight: 4 }} />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Space direction="horizontal">
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                    { min: 3, message: "First Name minimal 3 karakter" },
                    {
                      whitespace: true,
                      message: "Tidak boleh diawali spasi",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Last name!",
                    },
                    { min: 3, message: "Last Name minimal 3 karakter" },
                    {
                      whitespace: true,
                      message: "Tidak boleh diawali spasi",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Space>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  {
                    type: "email",
                    pattern: emailRegex,
                    message: "Please enter a valid email",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Email"
                  prefix={<MailOutlined style={{ paddingRight: 4 }} />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password minimal 8 karakter" },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                  }}
                >
                  Register
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Spin>
    </div>
  );
}

export default LoginPage;
