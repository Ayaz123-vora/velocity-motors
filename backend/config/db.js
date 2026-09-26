const initialCars = require('../seed/seedData');

// In-memory data store for fallback operation
let memoryStore = {
  cars: [...initialCars],
  users: [
    {
      id: "usr-admin",
      name: "Admin Dealer",
      email: "admin@velocity.com",
      passwordHash: "$2a$10$vD2pT7F4F7aK9U6Q7d3kEu9/1zQxKxYJ1234567890abcdef", // 'admin123'
      role: "Admin"
    }
  ],
  testDrives: [
    {
      id: "td-001",
      carId: "car-001",
      carTitle: "Porsche 911 GT3 RS",
      userName: "Alex Mercer",
      userEmail: "alex@example.com",
      phone: "+1 (555) 234-5678",
      preferredDate: "2026-07-30",
      preferredTime: "14:00",
      status: "Approved",
      createdAt: new Date().toISOString()
    }
  ],
  inquiries: []
};

module.exports = {
  memoryStore,
  connectDB: async () => {
    console.log("[DB] Running with local high-performance memory store & seed dataset.");
  }
};
