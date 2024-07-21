const Event = require('../models/event.model');

exports.create = (req, res) => {
  const newEvent = {
    titulo: req.body.titulo,
    fechaHora: req.body.fechaHora,
    ubicacion: req.body.ubicacion,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    // imagen: req.file ? `/uploads/${req.file.filename}` : '',
    imagen: req.body.imagen,
    category_id: req.body.category_id
  };

  Event.create(newEvent, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event."
      });
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Event.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events."
      });
    } else res.json(data);
  });
};

exports.findOne = (req, res) => {
  Event.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  const event = {
    titulo: req.body.titulo,
    fechaHora: req.body.fechaHora,
    ubicacion: req.body.ubicacion,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    // imagen: req.file ? `/uploads/${req.file.filename}` : req.body.imagen,
    imagen: req.body.imagen,
    category_id: req.body.category_id
  };

  console.log("Titulo: " + event.titulo);
  console.log("Categoria: " + event.category_id);
  console.log("Fecha y Hora: " + event.fechaHora);
  console.log("Ubicacion: " + event.ubicacion);
  console.log("Descripcion: " + event.descripcion);
  console.log("Precio: " + event.precio);
  console.log("Imagen: " + event.imagen);

  Event.updateById(req.params.id, event, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Event with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Event.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Event with id " + req.params.id
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};
