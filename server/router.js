import { Router } from "express";

import * as user from "./request-handlers/user.handler.js";
import * as product from "./request-handlers/products.handler.js";
import { Auth, Seller } from "./middlewares/auth.js";
import uploader from "./middlewares/multer.js";

const productUploader = uploader([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

const router = Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/profile").get(Auth, user.profile);

router.route("/get-category").get(product.getCategory);
router.route("/add-products").post(Auth,productUploader,product.addProduct);
router.route("/get-products").get(product.getProducts);

router.route("/*").all((_req, res) => {
  console.log("hit");
  return res.status(404).json({
      msg: "Not found!"
  })
});

export default router;
