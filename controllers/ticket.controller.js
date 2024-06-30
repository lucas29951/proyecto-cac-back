const Ticket = require('../models/ticket.model');

exports.create = (req, res) => {
  const newTicket = {
    user_id: req.body.user_id,
    event_id: req.body.event_id,
    quantity: req.body.quantity,
    total_price: req.body.total_price
  };

  Ticket.create(newTicket, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Ticket."
      });
    } else res.send(data);
  });
};

exports.findByUserId = (req, res) => {
  Ticket.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets."
      });
    } else res.send(data);
  });
};
