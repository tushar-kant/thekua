const express = require('express');
const { check } = require('express-validator');
const { createEmployee, getEmployees } = require('../controllers/employeeController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getEmployees);

router.post(
    '/create',
    authenticateUser, // This middleware ensures only authenticated users can access this endpoint
    [
        check('employeeName')
            .isLength({ min: 2, max: 20 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Invalid employee name'),
        check('employeeId')
            .isLength({ min: 2, max: 10 })
            .matches(/^[a-zA-Z0-9\-\/]+$/)
            .withMessage('Invalid employee ID'),
        check('email')
            .isLength({ min: 3, max: 30 })
            .isEmail()
            .withMessage('Invalid email address'),
        check('designation')
            .isLength({ min: 2, max: 20 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Invalid designation'),
        check('department')
            .isLength({ min: 2, max: 20 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Invalid department'),
        check('unit')
            .isLength({ min: 2, max: 20 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Invalid unit'),
    ],
    createEmployee
);

module.exports = router;
