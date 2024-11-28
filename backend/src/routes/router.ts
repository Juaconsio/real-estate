import { Router } from "express";
import usersRouter from "./users";
import sessionRouter from "./session";

const router = Router();
router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
router.use("/users", usersRouter);
router.use("/session", sessionRouter);

export default router;