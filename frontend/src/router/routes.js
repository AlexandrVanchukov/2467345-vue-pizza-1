export default [
  {
    path: "/",
    name: "MainView",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/",
    name: "IndexView",
    component: () => import("../views/IndexView.vue"),
  },
  {
    path: "/welcome",
    name: "WelcomeView",
    component: () => import("../views/WelcomeView.vue"),
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/orders",
    name: "OrdersView",
    component: () => import("../views/OrdersView.vue"),
  },
  {
    path: "/sign-in",
    name: "SignInView",
    component: () => import("../views/SignInView.vue"),
  },
  {
    path: "/user-data",
    name: "UserDataView",
    component: () => import("../views/UserDataView.vue"),
  },
];
