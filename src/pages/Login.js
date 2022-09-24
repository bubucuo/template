import React from "react";
import {Button, Card, Form, Input, Checkbox} from "antd";
import {login} from "../request/login";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {register} from "../request/register";

export default function Login() {
  let navigate = useNavigate();

  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const onFinish = ({name, password, register_login}) => {
    console.log("Success:", {name, password, register_login});

    if (register_login) {
      registerAndLogin({name, password});
    } else {
      login({name, password}, () => {
        navigate(from);
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const registerAndLogin = (values) => {
    register(values, () => {
      login(values, () => {
        navigate(from);
      });
    });
  };

  return (
    <Card title="注册与登录">
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
          name="register_login"
          valuePropName="checked"
          wrapperCol={{offset: 7}}>
          <Checkbox>注册并登录</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
