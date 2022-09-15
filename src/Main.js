import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Layout from "./layout/";

export default function Main(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
