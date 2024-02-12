const User = require("../models/user.model");
const httpStatus = require("http-status");

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = async (req, res) => {
  try {
    console.log(req.user);
    // Check if req.user is present (assuming req.user contains the user ID extracted from the token)
    if (!req.user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }

    // Fetch user from database based on user ID extracted from the token
    const user = await User.findById(req.user);

    // Check if user exists
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Return user info
    res.status(httpStatus.OK).json(user.transform());
  } catch (error) {
    // Handle errors
    console.error("Error in loggedIn:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An unexpected error occurred" });
  }
};
