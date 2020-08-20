const ROLE = {
	ADMIN: 'admin',
	GUEST: 'guest',
};

module.exports = {
	ROLE,
	users: [
		{ id: '16053406', name: 'RR', role: ROLE.ADMIN },
		{ id: '19124169', name: 'TP', role: ROLE.GUEST },
	],
	location: [
		{ id: 803, name: 'Regional Surabaya', userid: 1 },
		{ id: 804, name: 'Regional Bandung', userid: 2 },
		{ id: 805, name: 'Regional Jakarta 1', userid: 3 },
		{ id: 888, name: 'KPNO', userid: 4 },
	],
};
