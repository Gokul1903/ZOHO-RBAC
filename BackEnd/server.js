// load environment variables from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/dbconnection");
const cookieParser = require('cookie-parser');

// import route handlers
const permissionRoutes = require('./routes/permissionRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');
const tableRoutes = require('./routes/tableRoutes');

// parse cookies from incoming requests
app.use(cookieParser());

// enable cors so frontend can talk to backend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// parse json request bodies
app.use(express.json());

// mount all routes
app.use('/auth', authRoutes);
app.use('/permissions', permissionRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/data', dataRoutes);
app.use("/meta", tableRoutes);


// start server after database connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("server failed to start:", error);
    process.exit(1);
  }
};

startServer();