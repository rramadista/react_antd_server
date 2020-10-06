const express = require('express');
const router = express.Router();

router.route('/').post(null).get(null).delete(null);
router.route('/:id').get(null).put(null).delete(null);
router.route('/bulkcreate').post(null);

module.exports = router;
