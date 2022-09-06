import { Form, Modal, Space, message, Table } from "antd";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Modaldata from "./Modaldata";

const { confirm } = Modal;

const Antdata = () => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(true);
  const [yScroll, setYScroll] = useState(true);
  const [xScroll, setXScroll] = useState("fixed");

  // MODAL

  const [visibles, setVisible] = useState(false);
  const [send, setSend] = useState({});
  {
    /* GET DATA */
  }
  const [datas, setData] = useState([]);

  {
    /* UPDATE MODAL STATE */
  }

  const length = datas.length;

  {
    /* TABLE HOTEL LIST  */
  }
  const columns = [
    {
      title: "Hotel Id",
      dataIndex: "id",
      width: "7%",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      width: "10%",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      width: "8%",

      sorter: (a, b) => a.owner.length - b.owner.length,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "14%",
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.length - b.city.length,
      width: "10%",
    },
    {
      title: "State",
      dataIndex: "state",
      width: "10%",
      sorter: (a, b) => a.state.length - b.state.length,
    },
    {
      title: "Pin",
      dataIndex: "pin",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      width: "10%",
      sorter: (a, b) => a.contact - b.contact,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "8%",
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: "Edit",
      key: "edit",
      // width: '8%',
      render: (a) => (
        <Space size="middle">
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "green" }}
            onClick={() => handleOpenModal(a)}
          >
            <EditIcon />
          </Button>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      // width: '7%',
      render: (a) => (
        <Space size="middle">
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              return showPromiseConfirm(a.id);
            }}
          >
            <DeleteIcon />
          </Button>
        </Space>
      ),
    },
  ];

  {
    /* DELETED SUCCESSFUL MODAL BOX */
  }

  const Delete = () => {
    message.success("Deleted Successfully", 1.5);
  };

  {
    /* ARE YOU SURE MODAL BOX */
  }

  const showPromiseConfirm = (id) => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        return new Promise((resolve, reject) => {
          fetch(`http://localhost:4100/hotellist/${id}`, {
            method: "DELETE",
          });

          setTimeout(Math.random() > 0.2 ? resolve : reject, 1000);
          fetching();
          Delete();
        })
          .then(() => {
            // Delete();
            fetching();
          })
          .catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };

  {
    /* UPDATING THE DATA USING THIS FUNCTION */
  }

  {
    /* CALLING GET METHOD */
  }

  async function fetching() {
    const res = await fetch("http://localhost:4100/hotellist");
    const print = await res.json();
    setData(print);
  }

  {
    /* TABLE DATA SHOWING */
  }

  const data = [];

  for (let i = 0; i < datas.length; i++) {
    data.push({
      key: datas[i].hid,
      id: datas[i].hid,
      name: datas[i].h_name,
      owner: datas[i].h_owner,
      address: datas[i].address,
      city: datas[i].city,
      state: datas[i].state,
      pin: datas[i].pin,
      contact: datas[i].contact,
      type: datas[i].type,
      edit: datas[i].hid,
      delete: datas[i].hid,
    });
  }

  {
    /* CALLING GET METHOD FOR THE HOTEL DATA */
  }

  useEffect(() => {
    fetching();
  }, []);

  {
    /* VERTICAL SCROLLING FOR DATA */
  }

  const scroll = {};

  if (yScroll) {
    scroll.y = 340;
  }

  if (xScroll) {
    scroll.x = "100vw";
  }

  {
    /* MAPPINF A COLUMNS */
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
    tableColumns[tableColumns.length - 2].fixed = "right";
  }

  {
    /* PASSING A PROPS TO THE TABLE */
  }

  const tableProps = {
    bordered,
    loading,
    scroll,
  };

  const handleOpenModal = (listData) => {
    setVisible(true);
    console.log("listData", listData);
    setSend(listData);
    // console.log("state", );
  };
  return (
    <div className="px-5">
      <h3
        className="px-5 pt-3"
        style={{ color: "red", textShadow: "0.5px 0.1px 1.3px blue" }}
      >
        All the Menu List
      </h3>
      <Table
        {...tableProps}
        pagination={{
          position: [bottom],
          size: "small",
          total: length,
          showSizeChanger: "true",
          showQuickJumper: "true",
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
        showSorterTooltip={false}
      />

      {/* MODAL FOR UPDATING A DATA */}

      <Modal
        centered
        visible={visibles}
        onOk={() => {
          setVisible(false);
          console.log(send.hid);
        }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Modaldata send={send} />
      </Modal>
    </div>
  );
};

export default Antdata;
