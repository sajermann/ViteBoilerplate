export function mapperSorting(data: Record<string, unknown>[]) {
	if (data.length === 0) return {};

	return {
		sort: data[0].id,
		desc: data[0].desc,
	};
}
