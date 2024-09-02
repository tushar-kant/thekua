const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        match: /^[a-zA-Z\s]+$/,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 10,
        match: /^[a-zA-Z0-9\-\/]+$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-z0-9\.@]+$/,
    },
    designation: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        match: /^[a-zA-Z\s]+$/,
    },
    department: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        match: /^[a-zA-Z\s]+$/,
    },
    unit: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        match: /^[a-zA-Z\s]+$/,
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
