require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const router = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/anay/", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server Connected port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`${error} not connected`));
