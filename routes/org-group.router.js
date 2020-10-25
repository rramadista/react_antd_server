const express = require('express');
const router = express.Router();

const orgGroup = require('../controllers/org-group.controller');

router
	.route('/bulk')
	.post(orgGroup.bulkCreateOrgGroup) // SUBMIT
	.delete(orgGroup.deleteSelectedOrgGroup); // DELETE
router
	.route('/')
	.get(orgGroup.getOrgGroup) // RETRIEVE
	.post(orgGroup.createOrgGroup) // SUBMIT
	.delete(orgGroup.deleteOrgGroup); // REMOVE
router
	.route('/:id')
	.get(orgGroup.findOrgGroupById) // RETRIEVE
	.put(orgGroup.updateOrgGroupById) // UPDATE
	.delete(orgGroup.deleteOrgGroupById); // REMOVE

module.exports = router;
