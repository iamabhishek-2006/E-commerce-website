const {
  registerUser,
  findUserByEmail,
} = require("../../services/users/auth.service");
const { generateToken, hashPassword, verifyPassword } = require("../../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
    // hash password

    const hashPswd = await hashPassword(password);

    const user = await registerUser({ name, email, password: hashPswd });

    // remove password

    user.password = undefined;
    user.__v = undefined;

    return res.json({
      success: true,
      data: user,
      message: "User register successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({
        success: false,
        error: "Email already exists",
      });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.json({
      success: false,
      error: "Email & password is required",
    });
  }

  try {
    const user = await findUserByEmail(email);

    // check password now
    if (!user) {
      return res.json({
        success: false,
        error: "user not found!",
      });
    }
    // check password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.json({
        success: false,
        error: "wrong password",
      });
    }
    user.password = undefined;

    const { accessToken, refreshToken } = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // get cart and wishlist

  

    return res.json({
      success: true,
      message: "User loggedin successfully",
      data: { accessToken, refreshToken, user },
    });
  } catch (error) {
    return res.json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports = { register, login };
