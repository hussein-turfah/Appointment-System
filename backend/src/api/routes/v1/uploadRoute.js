const express = require("express");
const router = express.Router();
const { upload, uploadFile } = require("../../controllers/UploadController");

router.post("/file", upload.single("file"), uploadFile);

module.exports = router;
