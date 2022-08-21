import { DownOutlined } from "@ant-design/icons";
import { Form, Radio, Space, Switch, Table } from "antd";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const columns = [
  {
    title: "Hotel Id",
    dataIndex: "id",
  },
  {
    title: "Hotel Name",
    dataIndex: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "City",
    dataIndex: "city",
    sorter: (a, b) => a.city - b.city,
  },
  {
    title: "State",
    dataIndex: "state",
    sorter: (a, b) => a.state - b.state,
  },
  {
    title: "Pin",
    dataIndex: "pin",
  },
  {
    title: "Hotel Owner",
    dataIndex: "owner",
    sorter: (a, b) => a.owner - b.owner,
  },
  {
    title: "Contact",
    dataIndex: "contact",
    sorter: (a, b) => a.contact - b.contact,
  },
  {
    title: "Hotel Type",
    dataIndex: "type",
    sorter: (a, b) => a.type - b.type,
  },
  {
    title: "Edit",
    key: "edit",
    render: () => (
      <Space size="middle">
        <Button variant="contained" size="small" style={{backgroundColor: "green"}}>Edit</Button>
      </Space>
    ),
  },
  {
    title: "Delete",
    key: "delete",
    render: () => (
      <Space size="middle">
        <Button variant="contained" size="small" style={{backgroundColor: "red"}}>Delete</Button>
      </Space>
    ),
  },
];



const Antdata = () => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("middle");
  const [hasData, setHasData] = useState(true);
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);
  const [datas, setData] = useState();

  async function fetching() {
    const res = await fetch("http://localhost:4100/hotellist");
    const print = await res.json();
    setData(print)
    console.log(print)
  }

  useEffect(() => {
    fetching();
  }, []);

  const data = [];
  // const data = datas.map((value, index) => {
  //   return (
  //     <div>
        
  //     </div>
  //   )
  // })

for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    id: datas.hid,
    name: datas.h_name,
    owner: "fdb",
    address: "fgn",
    city: "fg",
    state: "fgn",
    pin: `dfn`,
    contact: `dfn`,
    type: `gfn`,
  });
}

  const handleBorderChange = (enable) => {
    setBordered(enable);
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };

  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };

  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };

  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };

  const scroll = {};

  if (yScroll) {
    scroll.y = 240;
  }

  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
    tableColumns[tableColumns.length - 2].fixed = "right";
  }

  const tableProps = {
    bordered,
    loading,
    scroll,
  };

  const Load = () => {
    setTimeout(() => {
      setLoading(tableProps.loading);
    }, 2000);
  };
  

  return (
    <div className="p-5">

    
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
        <Form.Item label="Bordered">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item>
        <Form.Item label="loading">
          <Switch checked={loading} onChange={handleLoadingChange} />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="Has Data">
          <Switch checked={!!hasData} onChange={handleDataChange} />
        </Form.Item>
        <Form.Item label="Ellipsis">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item>
        <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="middle">Middle</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Bottom">
          <Radio.Group
            value={bottom}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
          >
            <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">BottomRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table
        {...tableProps}
        pagination={{
          position: [bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </div>
  );
};

export default Antdata;
