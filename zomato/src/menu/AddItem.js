import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
import { Button, Modal, Space, message, Form, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

function AddItem() {
  const [fullName, setFullName] = useState({
    item: "",
    price: "",
    type: "",
    avl_option: "",
    h_name: "",
    upload: "",
  });

  async function fetching() {
    const res = await fetch("http://localhost:4100/menulist");
    const print = await res.json();
  }

  const Success = () => {
    message
      .loading("Adding..", 0.5)
      .then(() => message.info("Menu added Succesfully", 1.5));
  };

  const inputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFullName((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  function onSubmits(e) {
    e.preventDefault();

    fetching();

    let value = e.target.value;

    const data = {
      item: fullName.item,
      price: fullName.price,
      type: fullName.type,
      avl_option: fullName.avl_option,
      h_name: fullName.h_name,
      feature_pic: fullName.upload,
    };

    fetch("http://localhost:4100/menuitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });

    Success();

    setFullName({
      item: "",
      price: "",
      type: "",
      avl_option: "",
      h_name: "",
      upload: "",
    });
  }

  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="container">
      <h3>
        <b>Add your Menu</b>
      </h3>
      <br></br>

      <form onSubmit={onSubmits}>
        <div class="container mb-5">
          <div class="row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg1"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    ITEM
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="item"
                      value={fullName.item}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg1"
                      placeholder="Enter your item"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg1"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    HOTEL NAME
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="h_name"
                      value={fullName.h_name}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg1"
                      placeholder="Enter hotel name"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg2"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    PRICE
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="price"
                      value={fullName.price}
                      onChange={inputEvent}
                      type="text"
                      maxLength="10"
                      className="form-control form-control-sm"
                      id="colFormLabelLg2"
                      placeholder="Enter your item price"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg3"
                    className="col-sm-2 col-form-label col-form-label-sm"
                  >
                    TYPE
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="type"
                      value={fullName.type}
                      onChange={inputEvent}
                      class="form-select form-select-sm"
                      id="colFormLabelLg3"
                      aria-label="Default select example"
                      placeholder="Ex: Veg or Non-Veg"
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="Veg">Veg</option>
                      <option value="Non_Veg">Non Veg</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg4"
                    className="col-sm-6 col-form-label col-form-label-sm"
                  >
                    AVAILABLE OPTION
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="avl_option"
                      value={fullName.avl_option}
                      onChange={inputEvent}
                      class="form-select form-select-sm"
                      id="colFormLabelLg4"
                      aria-label="Default select example"
                      required
                    >
                      <option value="Select Option">Select Option</option>
                      <option value="Paneer">Paneer</option>
                      <option value="Roti">Roti</option>
                      <option value="Sambhar">Sambhar</option>
                      <option value="Naan">Naan</option>
                      <option value="Rayta">Rayta</option>
                      <option value="Chicken">Chicken</option>
                      <option value="Paneer Pasta">Paneer Pasta</option>
                      <option value="Dosa">Dosa</option>
                      <option value="Plain Pasta">Plain Pasta</option>
                      <option value="Burger">Burger</option>
                      <option value="Chhole">Chhole</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg2"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    UPLOAD IMAGE
                  </label>
                  <div>
                    <Upload
                      name="upload"
                      value={fullName.upload}
                      onChange={inputEvent}
                      action="/upload.do"
                      multiple
                    >
                      <Button type="primary" icon={<UploadOutlined />}>
                        Click to upload
                      </Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <center>
          <input
            style={{
              backgroundColor: "#1565C0",
              color: "white",
              border: "none",
            }}
            type="submit"
            value="Add"
            className="px-4 py-2 rounded shadow"
            size="large"
          ></input>
        </center>
      </form>
    </div>
  );
}

export default AddItem;
