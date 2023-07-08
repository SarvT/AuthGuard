const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: true,
  },
  email: {
    type: String,
    lowercase: true, // convert all emails into lower case for easy searching and comparison
    required: [true],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "Password should be at least eight characters long"],
    maxlength: 1024, // maximum length of the string can't exceed this value (in
    required: true,
  }, // hashed with bcrypt or similar algorithm to store securely in database

  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;
