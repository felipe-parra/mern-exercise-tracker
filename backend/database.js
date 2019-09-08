const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;
mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfylly");
});
