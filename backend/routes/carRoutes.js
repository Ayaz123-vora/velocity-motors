const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar, getMetaOptions } = require('../controllers/carController');

router.get('/meta', getMetaOptions);
router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
