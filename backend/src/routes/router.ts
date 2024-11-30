import { Router } from "express";
import usersRouter from "./user";
import sessionRouter from "./session";
import propertiesRouter from "./property";
const router = Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.use("/users", usersRouter);
router.use("/session", sessionRouter);
router.use("/properties", propertiesRouter);
export default router;