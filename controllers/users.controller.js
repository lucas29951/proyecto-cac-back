const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  User.create(newUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    } else res.send(data);
  });
};

exports.login = (req, res) => {
  User.findByUsername(req.body.username, (err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the User."
      });
    } else if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 horas
      });
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    }
  });
};

exports.logout = (req, res) => {
  res.status(200).send({
    message: "User logged out successfully."
  });
};