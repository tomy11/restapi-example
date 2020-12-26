const express = require('express');
const router = express.Router();
const authVerify = require('../middleware/verifytoken');

const index = require('../services/index.service')
const auth = require('../services/auth.service')

router.get('/', authVerify ,index.getAll);
router.post('/register', auth.register);
router.post('/singin', auth.singin);

module.exports = router;