import express from "express";

const routes = express.Router();
import userRoute from "./user.route.mjs";
import alatRoute from "./alat.route.mjs";

const router = [
  {
    path: "/",
    route: userRoute,
  },
  {
    path: "/alat",
    route: alatRoute,
  },
];

router.forEach(({ path, route }) => {
  routes.use(path, route);
});

export default routes;
