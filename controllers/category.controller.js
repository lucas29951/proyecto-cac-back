const Category = require('../models/category.model');

exports.create = (req, res) => {
  const newCategory = {
    name: req.body.name,
    description: req.body.description
  };

  Category.create(newCategory, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Category."
      });
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categories."
      });
    } else res.send(data);
  });
};
