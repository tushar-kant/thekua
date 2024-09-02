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

const getEmployees = async (req, res) => {
    const { page = 1, limit = 10, employeeName, employeeId, designation } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const filter = {};

    if (employeeName) {
        filter.employeeName = new RegExp(employeeName, 'i'); // Case-insensitive partial match
    }
    if (employeeId) {
        filter.employeeId = employeeId; // Exact match
    }
    if (designation) {
        filter.designation = designation; // Exact match
    }

    try {      
          const totalEmployees = await Employee.countDocuments(filter);

        const totalPages = Math.ceil(totalEmployees / limitNumber);

        const employees = await Employee.find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        res.status(200).json({
            currentPage: pageNumber,
            totalPages,
            totalEmployees,
            employees,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createEmployee,
    getEmployees,

};
