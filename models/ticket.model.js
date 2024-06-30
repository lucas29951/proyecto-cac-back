const db = require("../config/db.config");

const Ticket = {};

Ticket.create = (newTicket, result) => {
  db.query("INSERT INTO tickets SET ?", newTicket, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newTicket });
  });
};

Ticket.findByUserId = (userId, result) => {
  db.query(`SELECT * FROM tickets WHERE user_id = ?`, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Ticket;
