import { Router } from "express";
import addCsrfToken from "../middlewares/csrf.middleware.js";

const csrfRouter = Router();

const generateCsrfToken = async (req, res) => {
  return res.status(200).json({ csrfToken: res.locals.csrfToken });
}

csrfRouter.get('', addCsrfToken, generateCsrfToken);

export default csrfRouter;