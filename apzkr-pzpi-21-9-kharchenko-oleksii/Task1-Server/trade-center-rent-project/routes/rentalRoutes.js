const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models');

// Get all rentals
router.get('/', auth, async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single rental
router.get('/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    console.error('Error fetching rental:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new rental
router.post('/', auth, async (req, res) => {
  try {
    const newRental = new Rental(req.body);
    await newRental.save();
    res.status(201).json(newRental);
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a rental
router.put('/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json(rental);
  } catch (error) {
    console.error('Error updating rental:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a rental
router.delete('/:id', auth, async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.json({ message: 'Rental deleted successfully' });
  } catch (error) {
    console.error('Error deleting rental:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;