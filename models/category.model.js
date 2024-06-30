const db = require("../config/db.config");

const Category = {};

Category.create = (newCategory, result) => {
  db.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.getAll = (result) => {
  db.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Category;
