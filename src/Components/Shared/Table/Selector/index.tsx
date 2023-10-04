import { Row, Table } from '@tanstack/react-table';
import { Checkbox } from '~/Components/Shared/Checkbox';
import { RadioItem } from '~/Components/Shared/Radio';
import { TSelection } from '~/Types/TSelection';

type VerifyIndeterminateProps = {
	getIsAllRowsSelected: () => boolean;
	getIsSomeRowsSelected: () => boolean;
};
function verifyIndeterminate(table: VerifyIndeterminateProps) {
	if (table.getIsAllRowsSelected()) {
		return true;
	}

	if (table.getIsSomeRowsSelected()) {
		return 'indeterminate';
	}

	return false;
}

type Props<T> = {
	selection: TSelection<T>;
	row?: Row<T>;
	table?: Table<T>;
};

export function Selector<T>({ selection, row, table }: Props<T>) {
	if (selection.type === 'multi' && table) {
		return (
			<Checkbox
				containerProps={{
					className: 'flex items-center justify-center',
				}}
				checked={verifyIndeterminate(table)}
				onClick={table.getToggleAllRowsSelectedHandler()}
				{...{ disabled: selection.disableSelectionRow !== undefined }}
			/>
		);
	}
	if (!row) return null;
	if (selection.type === 'single' && selection.singleRadio) {
		return (
			<RadioItem
				value={row.id}
				disabled={
					selection.disableSelectionRow
						? selection.disableSelectionRow(row)
						: false
				}
			/>
		);
	}
	return (
		<Checkbox
			containerProps={{
				className: 'flex items-center justify-center',
			}}
			{...{
				disabled: selection.disableSelectionRow
					? selection.disableSelectionRow(row)
					: false,
				checked: row.getIsSelected(),
			}}
		/>
	);
}