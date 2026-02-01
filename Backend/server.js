
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

    //  MIDDLEWARE 
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Your Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

//  MONGODB CONNECTION 
mongoose.connect("mongodb://127.0.0.1:27017/Ankit", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));


  // ROUTE MOUNT (NO SCHEMA / MODEL HERE).  
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes/auth"));


      //  SERVER 
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


