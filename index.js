const express = require("express");
const cors = require("cors");
const app = express();
const ProductsRoute = require("./routes/productsRoutes.js");

app.use(express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(ProductsRoute);

app.listen(3000, () => console.log("App is running..."));
