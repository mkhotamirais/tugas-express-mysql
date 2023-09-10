const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", upload.single("image"), createProduct);
router.patch("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", upload.single("image"), deleteProduct);

module.exports = router;
