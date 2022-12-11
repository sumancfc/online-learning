const express = require("express");
const router = express.Router();

const { runValidation } = require("../validators");
const { categoryValidator } = require("../validators/category");
const { createCategory, getAllCategories } = require("../controllers/catrgory");

router.post(
  "/category/create",
  categoryValidator,
  runValidation,
  createCategory
);
router.get("/category/all", getAllCategories);

module.exports = router;
