import React from "react";
import {Button, Card, Form, Input} from "antd";
import {login} from "../request/login";
import {useNavigate} from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values, () => {
      navigate("/?id=23");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="登录">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="用户名"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
