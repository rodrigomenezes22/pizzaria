import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Rotas User
router.post("/users", new CreateUserController().handle);
// Login
router.post("/session", new AuthUserController().handle);
// Informacoes do usuario
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Category
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
// List all categories
router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas Product
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

export { router };
