const { memoryStore } = require('../config/db');

// GET all cars with search, filters, sorting
const getCars = (req, res) => {
  try {
    let cars = [...memoryStore.cars];
    const { search, make, fuelType, bodyType, minPrice, maxPrice, category, sort, featured } = req.query;

    // Filter by search query (title, make, model, category)
    if (search) {
      const q = search.toLowerCase();
      cars = cars.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }

    // Filter by Make
    if (make && make !== 'All') {
      cars = cars.filter(c => c.make.toLowerCase() === make.toLowerCase());
    }

    // Filter by Fuel Type
    if (fuelType && fuelType !== 'All') {
      cars = cars.filter(c => c.fuelType.toLowerCase() === fuelType.toLowerCase());
    }

    // Filter by Body Type
    if (bodyType && bodyType !== 'All') {
      cars = cars.filter(c => c.bodyType.toLowerCase() === bodyType.toLowerCase());
    }

    // Filter by Category
    if (category && category !== 'All') {
      cars = cars.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Featured
    if (featured === 'true') {
      cars = cars.filter(c => c.featured === true);
    }

    // Filter by Min Price
    if (minPrice) {
      cars = cars.filter(c => c.price >= Number(minPrice));
    }

    // Filter by Max Price
    if (maxPrice) {
      cars = cars.filter(c => c.price <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price-asc') {
      cars.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      cars.sort((a, b) => b.price - a.price);
    } else if (sort === 'year-desc') {
      cars.sort((a, b) => b.year - a.year);
    } else if (sort === 'hp-desc') {
      cars.sort((a, b) => b.horsepower - a.horsepower);
    }

    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single car by ID
const getCarById = (req, res) => {
  try {
    const car = memoryStore.cars.find(c => c.id === req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car listing not found" });
    }
    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST Create new car
const createCar = (req, res) => {
  try {
    const newCar = {
      id: "car-" + Date.now(),
      title: req.body.title || "Untitled Vehicle",
      make: req.body.make || "Custom",
      model: req.body.model || "Custom",
      year: Number(req.body.year) || 2024,
      price: Number(req.body.price) || 50000,
      mileage: Number(req.body.mileage) || 0,
      fuelType: req.body.fuelType || "Petrol",
      transmission: req.body.transmission || "Automatic",
      bodyType: req.body.bodyType || "Coupe",
      engine: req.body.engine || "V8 Turbo",
      horsepower: Number(req.body.horsepower) || 450,
      zeroToSixty: req.body.zeroToSixty || "3.5s",
      topSpeed: req.body.topSpeed || "180 mph",
      drivetrain: req.body.drivetrain || "AWD",
      exteriorColor: req.body.exteriorColor || "Black",
      interiorColor: req.body.interiorColor || "Black",
      status: req.body.status || "Available",
      category: req.body.category || "Luxury",
      featured: req.body.featured || false,
      description: req.body.description || "",
      features: req.body.features || ["Premium Sound", "Leather Seats", "Navigation"],
      images: req.body.images && req.body.images.length > 0 ? req.body.images : [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
      ]
    };

    memoryStore.cars.unshift(newCar);
    res.status(201).json({ success: true, data: newCar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT Update car
const updateCar = (req, res) => {
  try {
    const index = memoryStore.cars.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    memoryStore.cars[index] = {
      ...memoryStore.cars[index],
      ...req.body
    };

    res.json({ success: true, data: memoryStore.cars[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Car
const deleteCar = (req, res) => {
  try {
    const index = memoryStore.cars.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const deleted = memoryStore.cars.splice(index, 1);
    res.json({ success: true, data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Filter Meta Options
const getMetaOptions = (req, res) => {
  const makes = [...new Set(memoryStore.cars.map(c => c.make))];
  const fuelTypes = [...new Set(memoryStore.cars.map(c => c.fuelType))];
  const bodyTypes = [...new Set(memoryStore.cars.map(c => c.bodyType))];
  const categories = [...new Set(memoryStore.cars.map(c => c.category))];

  res.json({
    makes,
    fuelTypes,
    bodyTypes,
    categories
  });
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getMetaOptions
};
