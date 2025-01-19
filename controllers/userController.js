const userModel = require("../models/userModel");

// Login callback
async function loginController(req, res) {
  try {
    const { loginEmail, loginPassword } = req.body;
    const user = await userModel.findOne({ email:loginEmail, password: loginPassword });
    console.log(user)
    if (!user) {
      console.log('user not found')
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log('error in login', error)
    res.status(400).json({
      success: false,
      error,
    });
  }
}

// Register callback

async function registerController(req, res) {
  // console.log('register controlled called')
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    // console.log('error in register control')
    res.status(404).json({
      success: false,
      error,
    });
    console.log(error)
  }
}

// User Deletion
async function deleteController(req, res) {
  try {
    await userModel.findOneAndDelete({_id : req.params.id})
  res.status(200).json({
    success: true
  })
  } catch (error) {
    res.status(404).json({
      success: false
    })
  }
  
}

module.exports = {
  loginController,
  registerController,
  deleteController
};
