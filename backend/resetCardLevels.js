const mongoose = require("mongoose");
const Card = require("./models/Card");
require("dotenv").config({ path: __dirname + "/.env" });

const USER_ID = "68810e2e416cca3428a02978";

async function resetLevels() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Card.updateMany(
    { owner: USER_ID },
    { $set: { level: 1, progress: 0 } },
  );
  console.log("Tüm kartların seviyesi ve progressi sıfırlandı!");
  process.exit(0);
}

resetLevels();
