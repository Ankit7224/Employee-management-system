const express = require("express");
const router = express.Router();
const User = require("../model/User");
const upload = require("./upload");

//     REGISTER 
router.post("/create_user", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      qualification,
      role,
      password,
      dob,
      gender,
      employment,
      address,
      fatherName,
      fatherContact,
      bankName,
      holderName,
      place,
      accountNo,
      ifsc,
      date,
    } = req.body;

    console.log("Incoming body:", req.body);
    console.log("Incoming file:", req.file);

    // Validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, mobile, and password are required.",
      });
    }

    // Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Create user with image
    const user = await User.create({
      name,
      email,
      mobile,
      qualification,
      role,
      password,
      dob,
      gender,
      employment,
      address,
      fatherName,
      fatherContact,
      bankName,
      holderName,
      accountNo,
      ifsc,
      date,
      place,
      image: req.file ? req.file.filename : null,
    });
    User.create({name: "afdsgfdgdhdhfdhfjhgfjh"});

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      // user
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

//       LOGIN 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please enter all fields" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//    date filter ka use kiya
router.get("/users", async (req, res) => {
  try {
    const { startDate, endDate } = req.query; 
    let filter = {};

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

//   GET single user 
// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//     console.log(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

//  UPDATE user 

router.put("/users/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let updatedData = {};

    Object.keys(req.body).forEach((key) => {
      const newValue = req.body[key];
      if (newValue !== undefined && newValue !== "" && String(newValue) !== String(existingUser[key])) {
        updatedData[key] = newValue;
      }
    });

    // image upload karne ke liye
    if (req.file) updatedData.image = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    res.json({ success: true, user: updatedUser, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

//    DELETE
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
