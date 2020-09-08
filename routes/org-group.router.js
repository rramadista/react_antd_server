const express = require('express');
const router = express.Router();
const {
	getOrgGroup,
	addOrgGroup,
	updateOrgGroup,
	deleteOrgGroup,
} = require('../controllers/org-group.controller');

router.route('/').get(getOrgGroup).post(addOrgGroup);
router.route('/:id').put(updateOrgGroup).delete(deleteOrgGroup);

module.exports = router;
