import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";

function Modaldata(props) {
  const [fullName, setFullName] = useState({
    h_name: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    h_owner: "",
    contact: "",
    type: "",
  });

  const inputEvent = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    setFullName((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };


  async function fetching() {
    const res = await fetch("http://localhost:4100/hotellist");
    const print = await res.json();
  }

  useEffect(() => {
    fetching();
  }, []);
  useEffect(() => {
    setFullName({
      h_name: props.send.name,
      address: props.send.address,
      city: props.send.city,
      state: props.send.state,
      pin: props.send.pin,
      h_owner: props.send.owner,
      contact: props.send.contact,
      type: props.send.type,
    });
  }, [props]);
  return (
    <div>
      <form>
        <div class="container mt-3 mb-2">
          <div class="row row-cols-3 row-cols-lg-3 g-2 g-lg-3">
            <div class="col">
              <div class="p-0">
                <div>
                  <label
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
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
                      placeholder="Enter your hotel_Name"
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    CITY
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="city"
                      value={fullName.city}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="Enter your City"
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    STATE
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="state"
                      value={fullName.state}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="Enter your State "
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    ENTER PIN
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="pin"
                      value={fullName.pin}
                      onChange={inputEvent}
                      type="Number"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="Enter your pin"
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    HOTEL OWNER
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="h_owner"
                      value={fullName.h_owner}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="Enter owner Name "
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    CONTACT
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="contact"
                      value={fullName.contact}
                      onChange={inputEvent}
                      type="Number"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="eg: Number "
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    TYPE
                  </label>
                  <div className="col-sm-10">
                    <input
                      name="type"
                      value={fullName.type}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg3"
                      placeholder="eg: Veg or Non-Veg "
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
                    htmlFor="colFormLabelLg"
                    className="col-sm-4 col-form-label col-form-label-sm"
                  >
                    ADDRESS
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      name="address"
                      value={fullName.address}
                      onChange={inputEvent}
                      type="text"
                      className="form-control form-control-sm"
                      id="colFormLabelLg2"
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Modaldata;
