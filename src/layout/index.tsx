import {Space, Button} from "antd";
import {Outlet, Link} from "react-router-dom";
import docCookies from "../utils/cookies";
import {useNavigate} from "react-router";

export default function Layout() {
  const username = docCookies.getItem("name");

  const navigate = useNavigate();
  const logout = () => {
    docCookies.removeItem("sessionId");
    docCookies.removeItem("name");
    navigate("/login");
  };

  return (
    <div
      style={{
        paddingTop: 60,
      }}>
      <Space
        size="large"
        align="center"
        style={{
          zIndex: 22,
          position: "fixed",
          top: 0,
          width: "100%",
          lineHeight: "60px",
          paddingLeft: 20,
        }}>
        <Link to="/">首页</Link>
        <Button onClick={logout}> {username} 退出登录 </Button>
      </Space>

      <Outlet />
    </div>
  );
}
