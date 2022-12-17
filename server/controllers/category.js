const slugify = require("slugify");
const Category = require("../models/category");

//create category for courses
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    const categoryExists = await Category.findOne({ slug }).exec();

    if (categoryExists) {
      return res.send("Category Name already exist!");
    }

    const category = await new Category({ name, slug });
    category.save();

    return res.send("Category is Created!!!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Create Category!");
  }
};

//get all course category
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    return res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Get All Category!");
  }
};

//get categories by id
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).exec();

    if (category) {
      return res.json(category);
    } else {
      res.status(404).send("Category not Found");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Get the Category");
  }
};

//update category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    await Category.updateOne(
      { _id: req.params.id },
      { $set: { name, slug: slugify(name).toLowerCase() } }
    );

    return res.send("Category is Updated");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Update the Category");
  }
};

//delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.deleteOne({ _id: req.params.id }).exec();

    if (category) {
      return res.send("Category is Deleted");
    } else {
      return res.send("Category not Found or Already Deleted");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Delete the Category");
  }
};
