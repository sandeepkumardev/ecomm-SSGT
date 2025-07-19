const { registerUser, findUserByEmail, getProfileDB } = require("../../services/users/auth.services");
const { generateToken } = require("../../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
    const user = await registerUser({ name, email, password });
    return res.json({
      success: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Email already exists",
      });
    }

    return res.json({
      success: false,
      error: "User registration failed",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      error: "Email or Password is required!",
    });
  }

  try {
    const user = await findUserByEmail(email);

    // check user
    if (!user) {
      return res.json({
        success: false,
        error: "User doesn't exist!",
      });
    }

    // check password
    if (user.password !== password) {
      return res.json({
        success: false,
        error: "Wrong password!",
      });
    }

    // generate token
    const { accessToken, refreshToken } = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      message: "User loggedin successfully!",
      data: { user, accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "something went wrong!",
    });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.user;

  const data = await getProfileDB(id);

  return res.json({ success: true, data });
};

module.exports = { register, login, getProfile };
