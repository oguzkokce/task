const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const progressRoutes = require('./routes/progress');
const levelRoutes = require('./routes/level');
const energyRoute = require('./routes/energy');

app.use('/api/progress', progressRoutes);
app.use('/api/level-up', levelRoutes);
app.use('/api/energy', energyRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
