const mongoose = require("mongoose");
const Card = require("./models/Card");
require("dotenv").config({ path: __dirname + "/.env" });

const USER_ID = "68810e2e416cca3428a02978";

const cards = [{}, {}, {}, {}, {}, {}, {}, {}];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const existing = await Card.find({ owner: USER_ID });
  if (existing.length >= 8) {
    console.log("Kartlar zaten var.");
    process.exit(0);
  }
  for (let i = 0; i < 8; i++) {
    await Card.create({ owner: USER_ID, level: 1, progress: 0 });
  }
  console.log("8 kart eklendi!");
  process.exit(0);
}

seed();
