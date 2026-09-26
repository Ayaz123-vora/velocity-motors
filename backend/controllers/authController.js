const { memoryStore } = require('../config/db');

// Register User
const register = (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and password." });
    }

    const existingUser = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email already exists." });
    }

    const newUser = {
      id: "usr-" + Date.now(),
      name,
      email: email.toLowerCase(),
      role: role || "Buyer",
      token: "mock-jwt-token-" + Date.now()
    };

    memoryStore.users.push(newUser);

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter email and password." });
    }

    const user = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Admin shortcut or matched user
    if (user || (email === "admin@velocity.com" && password === "admin123")) {
      const activeUser = user || {
        id: "usr-admin",
        name: "Admin Dealer",
        email: "admin@velocity.com",
        role: "Admin"
      };

      return res.json({
        success: true,
        data: {
          id: activeUser.id,
          name: activeUser.name,
          email: activeUser.email,
          role: activeUser.role,
          token: "mock-jwt-token-" + Date.now()
        }
      });
    }

    res.status(401).json({ success: false, message: "Invalid email or password." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login
};
