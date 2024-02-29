const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");

/**
 * Service Schema
 *
 * @private
 *
 * @param {String} name - The name of the service
 * @param {String} description - The description of the service
 * @param {Number} price - The price of the service
 *
 * */

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
serviceSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "name",
      "description",
      "price",
      "doctor",
      "createdAt",
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
serviceSchema.statics = {
  /**
   * Get service
   *
   * @param {ObjectId} id - The objectId of service.
   * @returns {Promise<Service, APIError>}
   */
  async get(id) {
    try {
      let service;

      if (mongoose.Types.ObjectId.isValid(id)) {
        service = await this.findById(id).exec();
      }
      if (service) {
        return service;
      }

      throw new APIError({
        message: "Service does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List services in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of services to be skipped.
   * @param {number} limit - Limit number of services to be returned.
   * @returns {Promise<Service[]>}
   */
  list({ page = 1, perPage = 30, name, description, price, doctor }) {
    const options = omitBy({ name, description, price, doctor }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Create a service
   * @param {String} name - The name of the service
   * @param {String} description - The description of the service
   * @param {Number} price - The price of the service
   * @param {ObjectId} doctor - The doctor who created the service
   */
  async createService(name, description, price, doctor) {
    try {
      const service = await this.create({ name, description, price, doctor });
      return service;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a service
   * @param {ObjectId} serviceId - The objectId of the service.
   * @param {String} name - The name of the service
   * @param {String} description - The description of the service
   * @param {Number} price - The price of the service
   */
  async updateService(serviceId, name, description, price, doctorId) {
    try {
      const service = await this.findById(serviceId).exec();
      if (!service) {
        throw new APIError({
          message: "Service does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }

      if (service.doctor.toString() !== doctorId.toString()) {
        throw new APIError({
          message: "You are not authorized to update this service",
          status: httpStatus.UNAUTHORIZED,
        });
      }

      service.name = name;
      service.description = description;
      service.price = price;

      return service.save();
    } catch (error) {
      throw error;
    }
  },
  async deleteService(serviceId, doctorId) {
    try {
      const service = await this.findById(serviceId).exec();
      if (!service) {
        throw new APIError({
          message: "Service does not exist",
          status: httpStatus.NOT_FOUND,
        });
      }

      if (service.doctor.toString() !== doctorId.toString()) {
        throw new APIError({
          message: "You are not authorized to delete this service",
          status: httpStatus.UNAUTHORIZED,
        });
      }

      await this.deleteOne({ _id: serviceId }).exec();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model("Service", serviceSchema);
