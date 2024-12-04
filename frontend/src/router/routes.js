export default [
  {
    path: "/",
    name: "MainView",
    component: () => import("../views/MainView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/",
    name: "IndexView",
    component: () => import("../views/IndexView.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutOnlyHeader" },
  },
  {
    path: "/sign-in",
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
