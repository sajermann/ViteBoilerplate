import { ColumnDef, Row } from '@tanstack/react-table';

import { TSelection } from '~/App/Shared/Types/Table/TSelection';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { tableUtils } from '~/App/Shared/Utils/Table';
import { Td } from '../Td';
import { Tr } from '../Tr';
import { LoadingBar } from '../../LoadingBar';

type Props<T> = {
	selection?: Omit<TSelection<T>, 'disableCheckbox'>;
	data: T[];
	expandLine?: {
		render: (data: Row<T>) => React.ReactNode;
	};
	isLoading?: boolean;
	columns: ColumnDef<T>[];
};
export function IsLoading<T>({
	data,
	isLoading,
	expandLine,
	selection,
	columns,
}: Props<T>) {
	const { translate } = useTranslation();
	if (!isLoading) return null;
	return (
		<>
			<Tr className="h-full">
				<Td
					colSpan={tableUtils.countColSpan({
						columns,
						expandLine,
						selection,
					})}
					style={{ padding: 0 }}
				>
					<LoadingBar />
				</Td>
			</Tr>
			{data.length === 0 && (
				<Tr>
					<Td
						colSpan={tableUtils.countColSpan({
							columns,
							expandLine,
							selection,
						})}
						style={{ textAlign: 'center' }}
					>
						{translate('LOADING...')}
					</Td>
				</Tr>
			)}
		</>
	);
}
