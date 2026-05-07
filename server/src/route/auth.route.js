const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { registerSchema, loginSchema } = require('../validation/authValidation');
const validate = require('../middleware/validate');

router.post('/register', validate(registerSchema), authController.UserRegister);
router.post('/login', validate(loginSchema), authController.UserLogin);

module.exports = router;