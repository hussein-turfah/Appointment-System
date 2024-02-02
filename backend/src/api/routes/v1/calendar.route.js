const express = require("express");
const controller = require("../../controllers/calendar.controller");
const router = express.Router();
// const wrapper = require("../../utils/errorsWrapper"); //for error handling later

router
  .route("/events")
  .get(controller.list)
  .post(controller.create);

router
  .route("/events/:id")
  .get(controller.get)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;