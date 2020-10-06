const express = require('express');
const router = express.Router();
const {
	createOrgGroup,
	bulkCreateOrgGroup,
	getOrgGroup,
	updateOrgGroupById,
	deleteOrgGroupById,
	findOrgGroupById,
} = require('../controllers/org-group.controller');

router.route('/').get(getOrgGroup).post(createOrgGroup);
router
	.route('/:id')
	.get(findOrgGroupById)
	.put(updateOrgGroupById)
	.delete(deleteOrgGroupById);
router.route('/bulkcreate').post(bulkCreateOrgGroup);

module.exports = router;
