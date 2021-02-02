import Home from "./views/Home/";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Inicio",
    component: Home,
    layout: "/admin",
  },
];

export default dashboardRoutes;
