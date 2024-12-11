export default [
  {
    path: "/",
    name: "MainView",
    component: () => import("../views/MainView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/login",
    name: "SignInView",
    component: () => import("../views/SignInView.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
  {
    path: "/user",
    children: [
      {
        path: "profile",
        name: "UserDataView",
        component: () => import("../views/UserDataView.vue"),
      },
      {
        path: "orders",
        name: "OrdersView",
        component: () => import("../views/OrdersView.vue"),
      },
    ],
  },
];
