import {Outlet, Link} from "react-router-dom";

export default function Layout(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
