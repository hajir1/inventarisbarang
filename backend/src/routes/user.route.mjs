import express from "express";
import {
  GetUserC,
  LoginUserC,
  Logout,
  Me,
  RegisterUserC,
} from "../controller/user.controller.mjs";

const route = express.Router();
route.post("/register", RegisterUserC);
route.post("/login", LoginUserC);
route.get("/users", GetUserC);
route.get("/me", Me);
route.delete("/logout", Logout);
export default route;
