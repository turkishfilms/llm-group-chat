const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/handler");
const chatRoutes = require("./routes/chat");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/", chatRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
