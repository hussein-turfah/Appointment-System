const express = require('express');
const {createService,getServicesByDoctorId,deleteService,updateService}= require('../../controllers/servicesController')
const router = express.Router();

router.post('/', createService);
router.get('/', getServicesByDoctorId);
router.put('/:id',updateService);
router.delete('/:id',deleteService);

module.exports = router;