"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, Radio } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import Button from "@mui/material/Button";

const ReportSubmission: React.FC = () => {
  const [membersPresent, setMembersPresent] = useState<any>([
    "Leader's name",
    "hamza",
    "Jesus",
  ]);
  const [eventsActivities, setEventsActivities] = useState<any>("");
  const [online, setOnline] = useState<any>(false);
  const [prayerRequests, setPrayerRequests] = useState<any>("");

  const handleMembersPresent = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setMembersPresent(checkedValues);
  };

  const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];

  const onFinish = (values: any) => {
    console.log("Report submitted: ", values);
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Members Present"
          name="membersPresent"
          rules={[
            {
              required: true,
              message: "Please input the members present!",
            },
          ]}
        >
          <Checkbox.Group
            options={options}
            onChange={(checkedValues) => setMembersPresent(checkedValues)}
          />
          {/* <Checkbox.Group
            options={options}
            defaultValue={["Pear"]}
            onChange={handleMembersPresent}
          /> */}
        </Form.Item>
        <Form.Item
          label="Events/Activities"
          name="eventsActivities"
          rules={[
            {
              required: true,
              message: "Please input the events or activities!",
            },
          ]}
        >
          <Input
            value={eventsActivities}
            onChange={(e) => setEventsActivities(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please choose the location!",
            },
          ]}
        >
          <Radio.Group
            value={online}
            onChange={(e) => setOnline(e.target.value === "online")}
          >
            <Radio value="online">Online</Radio>
            <Radio value="offline">Offline</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Prayer Requests" name="prayerRequests">
          <Input
            value={prayerRequests}
            onChange={(e) => setPrayerRequests(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="submit" variant="outlined">
            Submit Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReportSubmission;
