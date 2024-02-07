const mongoose = require("mongoose");
const httpStatus = require("http-status");

const roles = ["user", "admin"];
const types = ["patient", "doctor", "secretary"];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    type: {
      type: String,
      enum: types,
      default: "patient",
    },
    firstName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      // required: true,
      minlength: 6,
      maxlength: 128,
    },
    avatar: {
      type: String,
      trim: true,
    },
    googleId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "firstName",
      "lastName",
      "email",
      "createdAt",
      "role",
      "type",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
userSchema.statics = {
  roles,
  types,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new Error({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    try {
      const { email, password, refreshObject } = options;
      if (!email) throw new Error("An email is required to generate a token");

      const user = await this.findOne({ email }).exec();
      const err = {
        status: httpStatus.UNAUTHORIZED,
        isPublic: true,
      };
      if (password) {
        if (user && (await user.passwordMatches(password))) {
          return { user, accessToken: user.token() };
        }
        err.message = "Incorrect email or password";
      } else if (refreshObject && refreshObject.userEmail === email) {
        return { user, accessToken: user.token() };
      } else {
        err.message = "Incorrect email or refreshToken";
      }
      throw err;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);
module.exports = User;
