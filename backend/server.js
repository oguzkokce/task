const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: 100, // Her IP için dakikada 100 istek
  message: { error: 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.' }
});

app.use('/api/', apiLimiter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const progressRoutes = require('./routes/progress');
const levelRoutes = require('./routes/level');
const energyRoute = require('./routes/energy');
const cardsRoute = require('./routes/cards');

app.use('/api/progress', progressRoutes);
app.use('/api/level-up', levelRoutes);
app.use('/api/energy', energyRoute);
app.use('/api/cards', cardsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
