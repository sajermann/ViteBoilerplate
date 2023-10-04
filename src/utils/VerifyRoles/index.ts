export function verifyRoles({
	allowRoles,
	rolesForVerify,
}: {
	allowRoles: string[];
	rolesForVerify: string[];
}) {
	let can = false;
	if (allowRoles.length === 0) {
		return true;
	}

	for (const role of rolesForVerify) {
		const result = allowRoles.find(item => item === role);
		if (result) {
			can = true;
		}
	}

	return can;
}
