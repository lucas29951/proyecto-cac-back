const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
