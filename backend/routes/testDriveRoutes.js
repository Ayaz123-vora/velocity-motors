const express = require('express');
const router = express.Router();
const { createTestDrive, getTestDrives, updateTestDriveStatus } = require('../controllers/testDriveController');

router.post('/', createTestDrive);
router.get('/', getTestDrives);
router.patch('/:id/status', updateTestDriveStatus);

module.exports = router;
