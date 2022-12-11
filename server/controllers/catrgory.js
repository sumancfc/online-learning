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
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    return res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to Get All Category!");
  }
};
