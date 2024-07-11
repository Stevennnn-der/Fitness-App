const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db")
const errorHandler = require("./middleware/errorhandler");

const port = process.env.PORT || 5001;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();

app.use("/", require("./routes/userRoutes"));
app.use(express.static('assets'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
