const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Parking } = require('../models');

// Get all parking spots
router.get('/', auth, async (req, res) => {
  try {
    const parkingSpots = await Parking.find();
    res.json(parkingSpots);
  } catch (error) {
    console.error('Error fetching parking spots:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single parking spot
router.get('/:id', auth, async (req, res) => {
  try {
    const parkingSpot = await Parking.findById(req.params.id);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    res.json(parkingSpot);
  } catch (error) {
    console.error('Error fetching parking spot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new parking spot
router.post('/', auth, async (req, res) => {
  try {
    const newParkingSpot = new Parking(req.body);
    await newParkingSpot.save();
    res.status(201).json(newParkingSpot);
  } catch (error) {
    console.error('Error creating parking spot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a parking spot
router.put('/:id', auth, async (req, res) => {
  try {
    const parkingSpot = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    res.json(parkingSpot);
  } catch (error) {
    console.error('Error updating parking spot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a parking spot
router.delete('/:id', auth, async (req, res) => {
  try {
    const parkingSpot = await Parking.findByIdAndDelete(req.params.id);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    res.json({ message: 'Parking spot deleted successfully' });
  } catch (error) {
    console.error('Error deleting parking spot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;