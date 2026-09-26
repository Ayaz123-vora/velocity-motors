const { memoryStore } = require('../config/db');

// Schedule a test drive
const createTestDrive = (req, res) => {
  try {
    const { carId, carTitle, userName, userEmail, phone, preferredDate, preferredTime, notes } = req.body;

    if (!carId || !userName || !userEmail || !phone || !preferredDate) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    const newBooking = {
      id: "td-" + Date.now(),
      carId,
      carTitle: carTitle || "Luxury Vehicle",
      userName,
      userEmail,
      phone,
      preferredDate,
      preferredTime: preferredTime || "12:00",
      notes: notes || "",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    memoryStore.testDrives.unshift(newBooking);

    res.status(201).json({
      success: true,
      message: "Test drive appointment confirmed!",
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all test drives
const getTestDrives = (req, res) => {
  try {
    res.json({
      success: true,
      count: memoryStore.testDrives.length,
      data: memoryStore.testDrives
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE test drive status
const updateTestDriveStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = memoryStore.testDrives.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTestDrive,
  getTestDrives,
  updateTestDriveStatus
};
