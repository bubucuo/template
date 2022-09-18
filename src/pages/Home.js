import {useEffect, useState} from "react";
import {deleteCanvas, getCanvasList} from "../request/canvas";
import {Card, Space, Table, Button} from "antd";
import {Link} from "react-router-dom";

export default function Home(props) {
  const [list, setList] = useState([]);

  const fresh = () => {
    getCanvasList("", (res) => {
      let data = res.content;
      data = data.filter(
        (item) => item.id !== 23 && item.id !== 15 && item.id !== 17
      );
      setList(data);
    });
  };

  useEffect(() => {
    fresh();
  }, []);

  const del = (values) => {
    deleteCanvas(values, () => {
      alert("删除成功");
      fresh();
    });
  };

  const columns = [
    {
      title: "id",
      key: "id",
      render: (item) => {
        const title = JSON.parse(item.content).title;
        return <Link to={"/edit?id=" + item.id}>{title}</Link>;
      },
    },

    {
      title: "动作",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Link
            target="_blank"
            to={"https://builder-lemon.vercel.app/?id=" + item.id}>
            线上查看（切移动端）
          </Link>
          <Link to={"/edit?id=" + item.id}>编辑</Link>
          <Button onClick={() => del({id: item.id})}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="首页">
      <h3>Home</h3>
      <Space size="middle">
        <Link to={"/login"}>登录</Link>
        <Link to={"/edit"}>新增</Link>
      </Space>

      <Table columns={columns} dataSource={list} />
    </Card>
  );
}
