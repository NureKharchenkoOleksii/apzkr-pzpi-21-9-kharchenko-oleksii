const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { Admin } = require('../models');

// Get all admins
router.get('/', auth, async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single admin
router.get('/:id', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create a new admin
router.post('/', auth, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if admin with this email already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).json({
            id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an admin
router.put('/:id', auth, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const adminFields = {};
        if (firstName) adminFields.firstName = firstName;
        if (lastName) adminFields.lastName = lastName;
        if (email) adminFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            adminFields.password = await bcrypt.hash(password, salt);
        }

        let admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin = await Admin.findByIdAndUpdate(
            req.params.id,
            { $set: adminFields },
            { new: true }
        ).select('-password');

        res.json(admin);
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete an admin
router.delete('/:id', auth, async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;