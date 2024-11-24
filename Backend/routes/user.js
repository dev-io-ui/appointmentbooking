const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();




router.post('/add-appointment', userController.postAddAppointment);
router.get('/users', userController.getAllAppointments);
router.delete('/delete-appointment/:id',userController.deleteAppointment);
router.put('/edit-appointment/:id',userController.editAppointment);

module.exports = router;