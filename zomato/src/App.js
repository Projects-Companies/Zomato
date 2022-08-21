import { Button, Checkbox, Divider, Tabs } from "antd";
import React, { useMemo, useState } from "react";
import HotelReg from "./hotel/HotelReg";
import HotelList from "./hotel/HotelList";
import AddItem from "./menu/AddItem";
import ViewItem from "./menu/ViewItem";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import "./App.css";
import Antdata from "./hotel/Antdata";

const { TabPane } = Tabs;

const OperationsSlot = {
  left: (
    <Link to="/" className="tabs-extra-demo-button px-5">
      Zomato
    </Link>
  ),
};
const options = ["left", "right"];

const App = () => {
  const [position, setPosition] = useState(["left", "right"]);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);
  return (
    <div>
      <Tabs tabBarExtraContent={slot} className="tabs">
        <TabPane tab="Hotel Registration" key="1">
          <HotelReg />
        </TabPane>
        <TabPane tab="Hotel List" key="2">
          <HotelList />
        </TabPane>
        <TabPane tab="Add Menu" key="3">
          <AddItem />
        </TabPane>
        <TabPane tab="Menu List" key="4">
          <ViewItem />
        </TabPane>
        <TabPane tab="Ant" key="5">
          <Antdata />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
