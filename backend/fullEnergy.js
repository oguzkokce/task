const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: __dirname + '/.env' });

const USER_ID = '68810e2e416cca3428a02978';

async function fullEnergy() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.updateOne({ _id: USER_ID }, { $set: { energy: 100, energyLastUpdated: new Date() } });
  console.log('Enerji 100 yapıldı!');
  process.exit(0);
}

fullEnergy(); 