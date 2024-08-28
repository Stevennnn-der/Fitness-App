const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db")
const errorHandler = require("./middleware/errorHandler");
const functions = require('firebase-functions')

const port = 5001;
const app = express();

dotenv.config();

const allowedOrigins = [
  'https://main--fitnessder.netlify.app',
  'https://fitnessder.netlify.app'
];

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      // Reject the request
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();


app.use("/", require("./routes/userRoutes"));
app.use("/homepage", require("./routes/homepageRoutes"));
app.use("/health", require("./routes/healthRoutes"));
app.use(express.static('assets'));

app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Server runnning on port ${port}`);
// });


exports.api = functions.https.onRequest(app)