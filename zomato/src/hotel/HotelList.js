import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Modal, Space, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Modaldata from "./Modaldata";

const { confirm } = Modal;

function HotelList() {
  const [response, setResponse] = useState([]);
  const [visibles, setVisible] = useState(false);
  const [send, setSend] = useState({});

  // console.log("CHCK", send.h_name);

  async function fetching() {
    const res = await fetch("http://localhost:4100/hotellist");
    const print = await res.json();
    setResponse(print);
  }

  const Delete = () => {
    message.success("Deleted Successfully", 1.5);
  };

  {
    /* ANT DESIGN MODAL */
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
        })
          .then(() => {
            fetching();
            Delete();
          })
          .catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };

  useEffect(() => {
    fetching();
  }, []);

  function updateData(con) {
    const data = {
      h_name: send.h_name,
      address: send.address,
      city: send.city,
      state: send.state,
      pin: send.pin,
      h_owner: send.h_owner,
      contact: send.contact,
      type: send.type,
    };

    // console.log("CHECK 2", send.h_name);
    // console.log("CHECK 22", con);

    const run = async () => {
      const res = await fetch(`http://localhost:4100/hotellist/${con}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const datas = await res.json();
      console.log("data api", datas);
      setSend(datas);
    };

    run();

    fetching();
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>hid</th>
            <th>h_name</th>
            <th>address</th>
            <th>city</th>
            <th>state</th>
            <th>pin</th>
            <th>h_owner</th>
            <th>contact</th>
            <th>type</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {response.map((data1, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{data1.hid}</td>
                <td>{data1.h_name}</td>
                <td>{data1.address}</td>
                <td>{data1.city}</td>
                <td>{data1.state}</td>
                <td>{data1.pin}</td>
                <td>{data1.h_owner}</td>
                <td>{data1.contact}</td>
                <td>{data1.type}</td>

                <td>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setVisible(true);
                      setSend(data1);
                    }}
                  >
                    <EditIcon color="action" />
                  </Button>
                </td>

                <td>
                  <Space wrap>
                    <Button
                      variant="contained"
                      onClick={() => {
                        return showPromiseConfirm(data1.hid);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </Button>
                  </Space>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <Modal
        centered
        visible={visibles}
        onOk={() => {
          setVisible(false);
          updateData(send.hid);
          console.log(send.hid);
        }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Modaldata send={send} />
      </Modal>
    </div>
  );
}

export default HotelList;
