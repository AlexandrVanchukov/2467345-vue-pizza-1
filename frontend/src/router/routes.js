import { isAuthenticated } from "../middlewares/isAuthenticated";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/MainView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/SignInView.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
  {
    path: "/user",
    meta: { middlewares: [isAuthenticated] },
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("../views/OrdersView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];
