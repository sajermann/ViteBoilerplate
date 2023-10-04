import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Table } from '~/Components/Shared/Table';
import { useTicket } from '~/Hooks/UseTicket';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TTicket } from '~/Types/TTicket';

export function Ticket() {
	const { tickets, searchParams, handlePage } = useTicket();
	const { translate } = useTranslation();
	const columns = useMemo<ColumnDef<TTicket>[]>(
		() => [
			{
				accessorKey: 'title',
				header: translate('TITLE'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'description',
				header: translate('DESCRIPTION'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'createdAt',
				header: translate('CREATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'updatedAt',
				header: translate('UPDATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'user.name',
				header: translate('USER'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'analyst.name',
				header: translate('ANALYST'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
		],
		[translate],
	);
	return (
		<div>
			<Table columns={columns} data={tickets?.data || []} />
		</div>
	);
}
