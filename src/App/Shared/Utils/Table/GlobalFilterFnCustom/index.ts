import { Row } from '@tanstack/react-table';
import { TFilterActive } from '~/App/Shared/Types/Table/TFilterActive';
import { tableUtils } from '..';

export function globalFilterFnCustom<T>(
	rows: Row<T>,
	columnId: string,
	filters: TFilterActive[],
) {
	const valueCell: string = rows.getValue(columnId);
	const results: boolean[] = [];

	for (const filter of filters) {
		if (filter.column === columnId) {
			results.push(
				tableUtils.filterByType(filter.type, filter.value, valueCell),
			);
		}
	}
	const result = results.find(item => item === true);
	if (result) {
		return true;
	}
	return false;
}
