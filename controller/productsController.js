const Products = require("../models/productsModel.js");
const path = require("path");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const response = await Products.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const response = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const imgName = req.file.originalname;
    const target = path.join(__dirname, "../uploads", imgName);
    fs.renameSync(req.file.path, target);
    req.body.image_url = imgName;
    await Products.create(req.body);
    res.status(201).json([req.body, req.file, { msg: "product created" }]);
  } catch (error) {
    console.error(error.message);
  }
};

const updateProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) {
    return (() => {
      res.status(404).json({ msg: "No data found" });
      fs.unlinkSync(req.file.path);
    })();
  }

  if (product.image_url == req.file.originalname) {
    req.body.image_url = product.image_url;
    fs.unlinkSync(req.file.path);
  } else {
    const imgName = req.file.originalname;
    const target = path.join(__dirname, "../uploads", imgName);
    fs.renameSync(req.file.path, target);
    req.body.image_url = imgName;
    const filepath = `./uploads/${product.image_url}`;
    fs.unlinkSync(filepath);
  }
  try {
    await Products.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json([req.body, { msg: "Product updated" }]);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) {
    return (() => {
      res.status(404).json({ msg: "No data found" });
      fs.unlinkSync(req.file.path);
    })();
  }
  try {
    const filepath = `./uploads/${product.image_url}`;
    fs.unlinkSync(filepath);
    fs.unlinkSync(req.file.path);
    await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
