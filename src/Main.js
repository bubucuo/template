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
import Home from "./pages/Home";

export default function Main(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Layout />}>
          <Route index element={<App />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}
