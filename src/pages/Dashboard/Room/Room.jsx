import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import Gap from "../../../components/Gap/Gap";
import {
  PlusOutlined,
  UploadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  Row,
  Space,
  Table,
  Typography,
  Image,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { uploaderConfig } from "../../../config/uploader-config";
import { useSingleUploader } from "../../../hooks/useSingleUploader";
import { Link } from "react-router-dom";
import { currencyRupiah } from "../../../helpers/currency-formater";
import {
  GET_ROOMS,
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
} from "./query/room-query";
import "./room.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Room() {
  const { Title } = Typography;
  const [formRoomData] = Form.useForm();
  const [image, setImage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [confirmModalLoading, setConfirmModalLoading] = useState(false);

  // Regex Validation
  const letterRegex = /^[a-zA-Z0-9\s.;,]+$/;
  const numberRegex = /^[0-9]+$/;

  // GET Data
  const {
    data: roomData,
    loading: isRoomLoading,
    error: isRoomError,
  } = useQuery(GET_ROOMS);

  // Add Data
  const [addRoom, { loading: loadingAddRoom }] = useMutation(ADD_ROOM, {
    refetchQueries: [GET_ROOMS],
  });

  // Update Data
  const [updateRoom, { loading: loadingUpdateRoom }] = useMutation(
    UPDATE_ROOM,
    {
      refetchQueries: [GET_ROOMS],
    }
  );

  //Delete Data
  const [deleteRoom, { loading: loadingDeleteRoom }] = useMutation(
    DELETE_ROOM,
    {
      refetchQueries: [GET_ROOMS],
    }
  );

  // Upload Image
  const [isLoadingUpload, uploadFile] = useSingleUploader();

  const [rowData, setRowData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const TABLE_COLUMNS = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => <Image src={record.image} width={200} />,
    },
    {
      title: "Nama Room",
      dataIndex: "nama_room",
      key: "nama_room",
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi",
      key: "lokasi",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      render: (_, record) => currencyRupiah(record?.harga),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        roomData?.booking_app_room.length >= 1 ? (
          <Space>
            <Link
              to={`/admin/room-admin/${record.uuid}`}
              className="btn-detail"
            >
              Detail
            </Link>
            <Link onClick={() => handleEdit(record)} className="btn-edit">
              Edit
            </Link>

            <Popconfirm
              title="Sure to Delete?"
              arrow={false}
              onConfirm={() => onDelete(record.uuid)}
            >
              <Link className="btn-delete">Delete</Link>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  const showModal = () => {
    setOpenModal(true);
  };

  // handle edit button
  const handleEdit = (row_data) => {
    setOpenModal(true);
    setRowData(row_data);
    setIsEdit(true);
    setImage(row_data.image);
    formRoomData.setFieldsValue({
      nama_room: row_data.nama_room,
      lokasi: row_data.lokasi,
      deskripsi: row_data.deskripsi,
      harga: row_data.harga,
    });
  };

  //   to handle cancel button
  const handleCancel = () => {
    setRowData();
    setImage("");
    setIsEdit(false);
    formRoomData.resetFields();
    setOpenModal(false);
  };

  //   Add Data to table
  const onAdd = (values) => {
    const body = {
      image: image,
      ...values,
    };

    addRoom({
      variables: {
        object: {
          ...body,
        },
      },
      onError: (err) => {
        message.open({
          type: "error",
          content: `${err?.message}`,
        });
      },
      onCompleted: () => handleCancel(),
    });

    setConfirmModalLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setConfirmModalLoading(false);
    }, 500);
  };

  //   Edit Data from table
  const onEdit = (values) => {
    const uuid = rowData.uuid;
    const body = {
      image: image,
      ...values,
    };

    updateRoom({
      variables: { pk_columns: { uuid: uuid }, _set: { ...body } },
      onCompleted: () => {
        handleCancel();
      },
      onError: (err) => {
        message.open({
          type: "error",
          content: `${err?.message}`,
        });
      },
    });
  };

  //   Delete Data from table
  const onDelete = (row_id) => {
    deleteRoom({
      variables: { uuid: row_id },
      onError: (err) => {
        message.open({
          type: "error",
          content: `${err?.message}`,
        });
      },
    });
  };

  // handle Upload Image
  const handleUpload = async (file) => {
    console.log(file);
    const body = {
      file: await getBase64(file.file.originFileObj),
      upload_preset: uploaderConfig.upload_preset,
      public_id: file.file.name.replace(/\.[^.]*$/, ""),
      api_key: uploaderConfig.api_key,
    };
    uploadFile(body, (data) => {
      console.log(data.url);
      setImage(data.url);
    });
  };

  useEffect(() => {
    if (isRoomError) {
      message.open({
        type: "error",
        content: `${isRoomError?.message}`,
      });
    }
  }, [isRoomError]);

  return (
    <>
      <section id="list-room">
        <Title level={3}>List Room</Title>

        <Space style={{ marginTop: 48 }}>
          <Button
            icon={<PlusOutlined />}
            className="btn-add"
            onClick={showModal}
          >
            Add Data
          </Button>

          <Modal
            title="Tambah Room Data"
            open={openModal}
            okText={isEdit ? "Save" : "Submit"}
            onOk={formRoomData.submit}
            confirmLoading={confirmModalLoading}
            onCancel={handleCancel}
            centered
            width={1000}
          >
            <Form
              className="form-room-data"
              name="form-room-data"
              form={formRoomData}
              onFinish={isEdit ? onEdit : onAdd}
              layout="vertical"
              style={{ margin: "40px auto", width: 600 }}
            >
              <Form.Item
                label="Nama Room"
                name="nama_room"
                rules={[
                  {
                    required: true,
                    message: "Please input your Room Name",
                  },
                  {
                    pattern: letterRegex,
                    message: "input must be letters",
                  },
                  {
                    max: 100,
                    message: "Cannot be longer than 100 characters",
                  },
                  {
                    whitespace: true,
                    message: "Cannot start with a space",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Lokasi"
                name="lokasi"
                rules={[
                  {
                    required: true,
                    message: "Please input your Room Name",
                  },
                  {
                    max: 50,
                    message: "Cannot be longer than 50 characters",
                  },
                  {
                    whitespace: true,
                    message: "Cannot start with a space",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Room Images">
                <Upload
                  showUploadList={false}
                  name="image"
                  maxCount={1}
                  onRemove={() => {
                    setImage();
                  }}
                  customRequest={() => {}}
                  onChange={handleUpload}
                >
                  <Button
                    icon={<UploadOutlined />}
                    type={!image ? "dashed" : "default"}
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      padding: "8px 16px",
                    }}
                  >
                    {image ? "Change Image" : "Upload Image"}
                  </Button>
                </Upload>

                {isLoadingUpload ? (
                  <LoadingComponent />
                ) : (
                  image && (
                    <div>
                      <Gap height={20} />
                      <img
                        src={image}
                        alt="room"
                        style={{
                          height: "150px",

                          borderRadius: "15px",
                        }}
                      />
                    </div>
                  )
                )}
              </Form.Item>

              <Form.Item
                label="Deskripsi"
                name="deskripsi"
                rules={[
                  {
                    required: true,
                    message: "Please input your Description",
                  },
                ]}
              >
                <Input.TextArea rows={4} showCount maxLength={1000} />
              </Form.Item>

              <Form.Item
                label="Harga"
                name="harga"
                rules={[
                  {
                    required: true,
                    message: "Please input your price",
                  },
                  {
                    pattern: numberRegex,
                    message: "Input must be a number",
                  },
                  {
                    max: 10,
                    message: "Cannot be longer than 10 characters",
                  },
                  {
                    whitespace: true,
                    message: "Cannot start with a space",
                  },
                ]}
                hasFeedback
              >
                <Input prefix={<DollarOutlined />} />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
        <Row>
          <Table
            className="table-room"
            rowKey="uuid"
            columns={TABLE_COLUMNS}
            dataSource={roomData?.booking_app_room}
            loading={isRoomLoading}
            style={{ width: "100%", marginTop: 24 }}
          />
        </Row>
      </section>
    </>
  );
}

export default Room;
