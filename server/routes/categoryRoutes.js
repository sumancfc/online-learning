const express = require("express");
const router = express.Router();

const { runValidation } = require("../validators");
const { categoryValidator } = require("../validators/category");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.post(
  "/category/create",
  categoryValidator,
  runValidation,
  createCategory
);
router.get("/category/all", getCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", categoryValidator, runValidation, updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
