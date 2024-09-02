const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { employeeName, employeeId, email, designation, department, unit } = req.body;

    try {
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            email,
            designation,
            department,
            unit,
        });

        const employee = await newEmployee.save();

        return res.status(201).json({
            message: 'Employee created successfully',
            employee,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createEmployee,
};
