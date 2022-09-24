import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Layout from "./layout";
import Home from "./pages/Home";
import docCookies from "./utils/cookies";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
          <Route index element={<Home />} />
          <Route path="/edit" element={<App />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function RequireAuth({children}: {children: JSX.Element}) {
  let auth = docCookies.getItem("sessionId");

  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}
