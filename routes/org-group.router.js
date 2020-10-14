const express = require('express');
const router = express.Router();
const {
	createOrgGroup,
	bulkCreateOrgGroup,
	getOrgGroup,
	findOrgGroupById,
	updateOrgGroupById,
	deleteOrgGroupById,
	deleteSelectedOrgGroup,
	deleteOrgGroup,
} = require('../controllers/org-group.controller');

router
	.route('/')
	.get(getOrgGroup)
	.post(createOrgGroup)
	.delete(deleteSelectedOrgGroup);
router
	.route('/:id')
	.get(findOrgGroupById)
	.put(updateOrgGroupById)
	.delete(deleteOrgGroupById);
router.route('/bulk').post(bulkCreateOrgGroup);

module.exports = router;
