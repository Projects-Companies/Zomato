import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Modal, Space, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function ViewItem() {
  const [response, setResponse] = useState([]);

  const fetching = async () => {
    const res = await fetch("http://localhost:4100/menulist");
    const print = await res.json();
    setResponse(print);
  };

  const Delete = () => {
    message.success("Deleted Successfully", 1.5);
  };

  const showPromiseConfirm = (id) => {
    confirm({
      title: "Do you want to delete this item?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        return new Promise((resolve, reject) => {
          fetch(`http://localhost:4100/menulist/${id}`, {
            method: "DELETE",
          });

          fetching();
          setTimeout(Math.random() > 0.2 ? resolve : reject, 1000);
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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Menu_Id</th>
            <th>Item</th>
            <th>Price</th>
            <th>Type</th>
            <th>Available_option</th>
            <th>Hotel Name</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {response.map((data1, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{data1.mid}</td>
                <td>{data1.item}</td>
                <td>{data1.price}</td>
                <td>{data1.type}</td>
                <td>{data1.avl_option}</td>
                <td>{data1.h_name}</td>
                <td>{data1.feature_pic}</td>

                <td>
                  <Button variant="contained">
                    <EditIcon color="action" />
                  </Button>
                </td>

                <td>
                  <Button
                    variant="contained"
                    onClick={() => {
                      return showPromiseConfirm(data1.mid);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default ViewItem;
