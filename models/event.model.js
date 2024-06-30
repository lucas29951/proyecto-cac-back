const db = require('../config/db.config');

const Event = {};

Event.create = (eventData, result) => {
  db.query("INSERT INTO events SET ?", eventData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...eventData });
  });
};

Event.findById = (id, result) => {
  db.query(`SELECT * FROM events WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Event.getAll = (result) => {
  db.query("SELECT * FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Event.updateById = (id, event, result) => {
  db.query(
    "UPDATE events SET titulo = ?, fechaHora = ?, ubicacion = ?, descripcion = ?, precio = ?, imagen = ?, category_id = ? WHERE id = ?",
    [event.titulo, event.fechaHora, event.ubicacion, event.descripcion, event.precio, event.imagen, event.category_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...event });
    }
  );
};

Event.remove = (id, result) => {
  db.query("DELETE FROM events WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Event;
