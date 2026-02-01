
const mongoose  = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    qualification: String,
    dob: Date,
    gender: String,
    employment: String, 
    role: {
      type: String,
      default: "user",
    },
    address: String,
    email: String,
    mobile: String,
    password: String,
    fatherName: String,
    fatherContact: String,
    bankName: String,
    holderName: String,
    accountNo: String,
    ifsc: String,
    place: String,
    date: Date,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)
