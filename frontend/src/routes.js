import Home from "./views/Home/";
import Login from "./views/Login/";
//frontend/src/views/Home/index.js
const dashboardRoutes = [
  {
    path: "/home",
    name: "Inicio",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/admin",
  },
];

export default dashboardRoutes;
