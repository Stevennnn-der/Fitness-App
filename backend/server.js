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
      callback(null, true); // Allow requests with no origin or if the origin is in the list
    } else {
      callback(new Error('Not allowed by CORS')); // Reject other origins
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  allowedHeaders: 'Content-Type,Authorization'
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