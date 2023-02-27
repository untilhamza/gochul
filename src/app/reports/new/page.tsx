"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, Radio, Row } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { Button, Space, Col } from "antd";

const ReportSubmission: React.FC = () => {
  const [membersPresent, setMembersPresent] = useState<any>([]);
  const [eventsActivities, setEventsActivities] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);
  const [prayerRequests, setPrayerRequests] = useState<string>("");

  const handleMembersPresent = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setMembersPresent(checkedValues);
  };

  const options = [
    { label: "Leader", value: "Leader" },
    { label: "Apple!!", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
    { label: "Banana", value: "Banana" },
    { label: "Mango", value: "Mango" },
    { label: "Pineapple", value: "Pineapple" },
    { label: "Strawberry", value: "Strawberry" },
  ];

  const onFinish = (values: any) => {
    console.log("Report submitted: ", values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        // layout="horizontal"
        labelAlign="left"
        style={{
          maxWidth: 800,
          margin: "auto",
          overflow: "hidden",
          padding: 5,
        }}
      >
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
            onChange={(checkedValues) => setMembersPresent(checkedValues)}
          >
            <Row justify="start" wrap>
              {options.map((option) => (
                <Col span={12} key={option.label}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
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
          <Input.TextArea
            value={eventsActivities}
            onChange={(e) => setEventsActivities(e.target.value)}
            size="large"
            allowClear
            autoSize={{ minRows: 3 }}
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
            <Row>
              <Space>
                <Col span={6}>
                  <Radio value="online">Online</Radio>
                </Col>
                <Col span={6}>
                  <Radio value="offline">Offline</Radio>
                </Col>
              </Space>
            </Row>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Prayer Requests" name="prayerRequests">
          <Input.TextArea
            value={prayerRequests}
            onChange={(e) => setPrayerRequests(e.target.value)}
            size="large"
            allowClear
            bordered
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>
        <Form.Item>
          <Space size={"large"} align="end">
            <Button size="middle" htmlType="submit">
              Submit Report
            </Button>
            <Button size="middle" danger>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReportSubmission;
